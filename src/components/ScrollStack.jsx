import { useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const wrapperRef = useRef(null);
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, viewportHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * viewportHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const viewportHeight = scroller.offsetHeight;
    const stackPositionPx = parsePercentage(stackPosition, viewportHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, viewportHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = cardsRef.current[cardsRef.current.length - 1].offsetTop - stackPositionPx - (itemStackDistance * (cardsRef.current.length - 1));

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCard = cardsRef.current[j];
          const jCardTop = jCard.offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    // Initial positioning
    updateCardTransforms();

    // Add scroll listener
    scroller.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    handleScroll,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`scroll-stack-wrapper ${className}`.trim()}
      ref={wrapperRef}
    >
      <div className="scroll-stack-scroller" ref={scrollerRef}>
        <div className="scroll-stack-inner">
          {children}
          {/* Spacer so the last card can stack properly */}
          <div className="scroll-stack-end" style={{ height: '2vh' }} />
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
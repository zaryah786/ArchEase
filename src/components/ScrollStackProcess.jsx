import React from 'react'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import ScrollAnimatedHeading from './ScrollAnimatedHeading'
import ScrollAnimatedText from './ScrollAnimatedText'
import './ScrollStackProcess.css'

function ScrollStackProcess() {
  const processSteps = [
    {
      number: '1',
      title: 'Step 1 – You Ask',
      description: 'Tell us exactly what you\'re looking for — product, solution, or a tricky spec.'
    },
    {
      number: '2',
      title: 'Step 2 – We Hunt',
      description: 'We shortlist from our trusted vendor pool.'
    },
    {
      number: '3',
      title: 'Step 3 – We Compare',
      description: 'You get L1, L2, L3 quotes — clearly laid out by cost, quality, and lead time.'
    },
    {
      number: '4',
      title: 'Step 4 – We Suggest',
      description: 'Our expert pick? The option that balances quality, price, and speed.'
    },
    {
      number: '5',
      title: 'Step 5 – You Decide',
      description: 'Select your winner. We connect you directly for a smooth handover.'
    },
    {
      number: '6',
      title: 'Step 6 – You Shine',
      description: 'Your project stays on track. Your client is happy. You take the credit.'
    }
  ]

  return (
    <section className="process-section-wrapper">
      <div className="process-header">
        <ScrollAnimatedHeading level="h2" className="section-title process-main-title">
          Our Process
        </ScrollAnimatedHeading>
        <ScrollAnimatedText tag="p" className="process-subtitle" delay={100}>
          Six simple steps to seamless sourcing
        </ScrollAnimatedText>
      </div>

      <ScrollStack
        className="process-scroll-stack"
        itemDistance={60}
        itemScale={0.02}
        itemStackDistance={25}
        stackPosition="25%"
        scaleEndPosition="10%"
        baseScale={0.92}
        rotationAmount={0}
        blurAmount={0}
      >
        {processSteps.map((step, index) => (
          <ScrollStackItem key={index} itemClassName="process-card">
            <div className="process-card-content">
              <div className="process-step-number">{step.number}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-description">{step.description}</p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}

export default ScrollStackProcess
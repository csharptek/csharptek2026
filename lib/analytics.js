/**
 * CSharpTek — Analytics Event Helpers
 * Usage: import { track } from '@/lib/analytics'
 */

export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

export const track = {
  // CTA buttons
  ctaClick:           (label, page)       => trackEvent('cta_click',              { cta_label: label, page_location: page }),

  // Nav
  navCtaClick:        (label)             => trackEvent('nav_cta_click',           { cta_label: label }),
  navDropdownClick:   (item, section)     => trackEvent('nav_dropdown_click',      { item, section }),

  // Contact form
  formStart:          ()                  => trackEvent('form_start',              { form_name: 'contact' }),
  formSubmit:         (service)           => trackEvent('form_submit',             { form_name: 'contact', service }),
  contactChannel:     (channel)           => trackEvent('contact_channel_click',   { channel }),

  // Industry pages
  industryView:       (industry)          => trackEvent('industry_view',           { industry }),
  industryCta:        (label, industry)   => trackEvent('industry_cta_click',      { cta_label: label, industry }),
  caseStudyClick:     (title, industry)   => trackEvent('case_study_click',        { case_study: title, industry }),

  // Service pages
  serviceView:        (service)           => trackEvent('service_view',            { service }),
  serviceCta:         (label, service)    => trackEvent('service_cta_click',       { cta_label: label, service }),

  // Homepage
  serviceCardClick:   (service)           => trackEvent('service_card_click',      { service }),
  industryCardClick:  (industry)          => trackEvent('industry_card_click',     { industry }),
  portfolioFilter:    (category)          => trackEvent('portfolio_filter',        { category }),
  quizComplete:       (tier, score)       => trackEvent('quiz_complete',           { tier, score }),
  chatbotOpen:        ()                  => trackEvent('chatbot_open',            {}),
  chatbotMessage:     ()                  => trackEvent('chatbot_message_sent',    {}),
  newsletterSub:      ()                  => trackEvent('newsletter_subscribe',    {}),

  // Portfolio page
  caseStudyOpen:      (title, category)   => trackEvent('case_study_open',        { case_study: title, category }),

  // Outbound
  outboundClick:      (url, label)        => trackEvent('outbound_click',         { link_url: url, link_label: label }),

  // Scroll depth
  scrollDepth:        (depth, page)       => trackEvent('scroll_depth',           { depth_percent: depth, page_location: page }),
}

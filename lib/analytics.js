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
  ctaClick:      (label, page)    => trackEvent('cta_click',           { cta_label: label, page_location: page }),
  formStart:     ()               => trackEvent('form_start',           { form_name: 'contact' }),
  formSubmit:    ()               => trackEvent('form_submit',          { form_name: 'contact' }),
  industryView:  (industry)       => trackEvent('industry_page_view',   { industry }),
  serviceView:   (service)        => trackEvent('service_page_view',    { service }),
  caseStudyOpen: (title)          => trackEvent('case_study_open',      { case_study: title }),
  scrollDepth:   (depth, page)    => trackEvent('scroll_depth',         { depth_percent: depth, page_location: page }),
  outboundClick: (url)            => trackEvent('outbound_click',       { link_url: url }),
}

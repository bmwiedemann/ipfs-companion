'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const navItem = require('./nav-item')

module.exports = function operations ({
  active,
  ipfsNodeType,
  isIpfsOnline,
  globalRedirectEnabled,
  siteRedirectOptOut,
  isApiAvailable,
  onQuickUpload,
  onOpenWebUi,
  onToggleSiteRedirect
}) {
  const activeQuickUpload = active && isIpfsOnline && isApiAvailable
  const activeWebUI = active && isIpfsOnline // (js-ipfs >=0.34.0-rc.0 is ok) && ipfsNodeType === 'external'
  const activeSiteRedirectSwitch = active && globalRedirectEnabled && ipfsNodeType === 'external'

  return html`
    <div class="fade-in pv1">
      <div class="bb b--black-20">
  ${navItem({
    text: browser.i18n.getMessage('panel_quickUpload'),
    addClass: 'b',
    disabled: !activeQuickUpload,
    onClick: onQuickUpload
  })}
  ${navItem({
    text: browser.i18n.getMessage('panel_openWebui'),
    disabled: !activeWebUI,
    onClick: onOpenWebUi
  })}
      </div>
  ${navItem({
    text: browser.i18n.getMessage(
      globalRedirectEnabled && !siteRedirectOptOut
        ? 'panel_thisSiteRedirectDisable'
        : 'panel_thisSiteRedirectEnable'
    ),
    disabled: !activeSiteRedirectSwitch,
    onClick: onToggleSiteRedirect
  })}
    </div>
  `
}

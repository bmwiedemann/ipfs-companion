'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const navItem = require('./nav-item')

module.exports = function operations ({
  active,
  isIpfsOnline,
  isApiAvailable,
  onQuickUpload,
  onOpenWebUi
}) {
  const activeQuickUpload = active && isIpfsOnline && isApiAvailable
  const activeWebUI = active && isIpfsOnline // (js-ipfs >=0.34.0-rc.0 is ok) && ipfsNodeType === 'external'

  return html`
    <div class="fade-in pv1">
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
  `
}

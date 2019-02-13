'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const navItem = require('./nav-item')
const { contextMenuCopyAddressAtPublicGw, contextMenuCopyRawCid, contextMenuCopyCanonicalAddress } = require('../../lib/context-menus')

module.exports = function contextActions ({
  active,
  globalRedirectEnabled,
  currentFqdn,
  currentTabRedirectOptOut,
  ipfsNodeType,
  isIpfsContext,
  isPinning,
  isUnPinning,
  isPinned,
  isIpfsOnline,
  isApiAvailable,
  onToggleSiteRedirect,
  onCopy,
  onPin,
  onUnPin
}) {
  const activePinControls = active && isIpfsOnline && isApiAvailable && !(isPinning || isUnPinning)
  const activeSiteRedirectSwitch = active && globalRedirectEnabled && ipfsNodeType === 'external'

  const renderIpfsContextItems = () => {
    if (!isIpfsContext) return
    return html`<div>
  ${navItem({
    text: browser.i18n.getMessage(contextMenuCopyAddressAtPublicGw),
    onClick: () => onCopy(contextMenuCopyAddressAtPublicGw)
  })}
  ${navItem({
    text: browser.i18n.getMessage(contextMenuCopyCanonicalAddress),
    onClick: () => onCopy(contextMenuCopyCanonicalAddress)
  })}
  ${navItem({
    text: browser.i18n.getMessage(contextMenuCopyRawCid),
    disabled: !activePinControls,
    onClick: () => onCopy(contextMenuCopyRawCid)
  })}
  ${!isPinned ? (
    navItem({
      text: browser.i18n.getMessage('panel_pinCurrentIpfsAddress'),
      disabled: !activePinControls,
      onClick: onPin
    })
  ) : null}
  ${isPinned ? (
    navItem({
      text: browser.i18n.getMessage('panel_unpinCurrentIpfsAddress'),
      disabled: !activePinControls,
      onClick: onUnPin
    })
  ) : null}
  </div>
    `
  }

  const renderSiteRedirectToggle = () => {
    if (!activeSiteRedirectSwitch) return
    const siteRedirectToggleLabel = browser.i18n.getMessage(
      globalRedirectEnabled && !currentTabRedirectOptOut
        ? 'panel_activeTabSiteRedirectDisable'
        : 'panel_activeTabSiteRedirectEnable',
      currentFqdn
    )
    return html`
  ${navItem({
    text: siteRedirectToggleLabel,
    addClass: 'truncate',
    disabled: !activeSiteRedirectSwitch,
    onClick: onToggleSiteRedirect
  })}
      `
  }

  return html`
    <div class='fade-in pv1'>
  ${renderIpfsContextItems()}
  ${renderSiteRedirectToggle()}
    </div>
  `
}

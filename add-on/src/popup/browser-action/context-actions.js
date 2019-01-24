'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const navItem = require('./nav-item')
const { contextMenuCopyAddressAtPublicGw, contextMenuCopyRawCid, contextMenuCopyCanonicalAddress } = require('../../lib/context-menus')

module.exports = function contextActions ({
  active,
  globalRedirectEnabled,
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
  return html`
    <div class='fade-in pv1'>
  ${navItem({
    text: browser.i18n.getMessage(
      globalRedirectEnabled && !currentTabRedirectOptOut
        ? 'panel_thisSiteRedirectDisable'
        : 'panel_thisSiteRedirectEnable'
    ),
    disabled: !activeSiteRedirectSwitch,
    onClick: onToggleSiteRedirect
  })}
  ${renderIpfsContextItems()}
    </div>
  `
}

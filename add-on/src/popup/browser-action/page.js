'use strict'
/* eslint-env browser, webextensions */

const html = require('choo/html')
const header = require('./header')
const contextActions = require('./context-actions')
const operations = require('./operations')

// Render the browser action page:
// Passed current app `state` from the store and `emit`, a function to create
// events, allowing views to signal back to the store that something happened.
module.exports = function browserActionPage (state, emit) {
  const onCopy = (copyAction) => emit('copy', copyAction)
  const onPin = () => emit('pin')
  const onUnPin = () => emit('unPin')

  const onQuickUpload = () => emit('quickUpload')
  const onOpenWebUi = () => emit('openWebUi')
  const onOpenPrefs = () => emit('openPrefs')
  const onToggleGlobalRedirect = () => emit('toggleGlobalRedirect')
  const onToggleSiteRedirect = () => emit('toggleSiteRedirect')
  const onToggleNodeType = () => emit('toggleNodeType')
  const onToggleActive = () => emit('toggleActive')

  const headerProps = Object.assign({ onToggleNodeType, onToggleActive, onToggleGlobalRedirect, onOpenPrefs }, state)
  const contextActionsProps = Object.assign({ onToggleSiteRedirect, onCopy, onPin, onUnPin }, state)
  const opsProps = Object.assign({ onQuickUpload, onOpenWebUi }, state)

  return html`
    <div class="sans-serif" style="text-rendering: optimizeLegibility;">
      ${header(headerProps)}
      ${operations(opsProps)}

      <div class="no-select w-100 outline-0--focus tl ba b--dashed b--navy-muted">
        <div class="ph3 pv2 b navy-muted bg-snow-muted truncate tl ">
          Actions for <span title="${state.currentFqdn}">the Active Tab</span>:
        </div>
        <div class="">
          ${contextActions(contextActionsProps)}
        </div>
      </div>
    </div>
  `
}

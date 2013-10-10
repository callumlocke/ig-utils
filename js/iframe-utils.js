(function (window) {

  'use strict';

  window.IG = window.IG || {};

  var isEmbedded = window.parent !== window;

  var iframeUtils = window.IG.iframeUtils = {

    isEmbeddedIframe: function isEmbeddedIframe() {
      return isEmbedded;
    },

    setDocumentDomain: function setDocumentDomain() {
      if (document.domain && /ft\.com$/.test(document.domain)) {
        document.domain = 'ft.com';
      }
    },

    targetLinks: function targetLinksToParent(target) {
      if (!iframeUtils.isEmbeddedIframe() || document.getElementsByTagName('base').length) {
        return;
      }

      var base = document.createElement('base');
      base.target = target || '_parent';
      document.getElementsByTagName('head')[0].appendChild(base);
    },

    getParentFrameSize: function getParentFrameSize(allowCompute) {

      allowCompute = typeof allowCompute === 'boolean' ? allowCompute : true;

      var result = {};

      if (!iframeUtils.isEmbeddedIframe()) {
        return result;
      }

      var fe = window.frameElement;
      var iframeWidth = fe.width || fe.style.width;
      var iframeHeight = fe.height || fe.style.height;

      if (allowCompute && (!iframeWidth || !iframeHeight)) {
        // ideally this wont kick in because getComputedStyle causes reflows
        // and if there are multiple instances of our wrapper then we could causes layout thrashing
        var computedStyles = window.parent.getComputedStyle(fe, null);

        if (!iframeWidth) {
          iframeWidth = computedStyles.getPropertyValue('width');
        }

        if (!iframeHeight) {
          iframeHeight = computedStyles.getPropertyValue('height');
        }
      }

      result.width = parseInt(iframeWidth || 0, 10);
      result.height = parseInt(iframeHeight || 0, 10);

      return result;

    },

    showParentFrame: function hideParentFrame() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var s = window.frameElement.style;
      // just removes inline styles
      s.display = '';
      s.visibility = '';
    },

    hideParentFrame: function hideParentFrame() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var s = window.frameElement.style;
      s.display = 'none';
      s.visibility = 'hidden';
    },

    getContentWidth: function getContentWidth() {
      var body = document.body,
          html = document.documentElement;

      return Math.max(
        body.scrollWidth, html.scrollWidth,
        body.offsetWidth, html.offsetWidth,
        body.clientWidth, html.clientWidth
      );
    },

    getContentHeight: function getContentWidth() {
      var body = document.body,
          html = document.documentElement;

      return Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
      );
    },

    getContentSize: function getContentSize () {
      return {
        width: iframeUtils.getContentWidth(),
        height: iframeUtils.getContentHeight()
      };
    },

    // deprecated
    setParentIframeDimToContent: function setParentIframeDimToContent() {
      iframeUtils.resizeParentFrameToContentSize();
    },

    resizeParentFrameToContentSize: function resizeParentFrameToContentSize() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var dim = iframeUtils.getContentSize();
      var s = window.frameElement.style;
      s.height = dim.height + 'px';
      s.width = dim.width + 'px';
    },

    resizeZeroParentFrameValuesToContent: function resizeZeroParentFrameValuesToContent() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var currentFrameSize = iframeUtils.getParentFrameSize();
      var w = currentFrameSize.width;
      var h = currentFrameSize.height;
      var s = window.frameElement.style;

      if (!w && !h) {
        iframeUtils.resizeParentFrameToContentSize();
      } else if (!w) {
        s.width = iframeUtils.getContentWidth() + 'px';
      } else if (!h) {
        s.height = iframeUtils.getContentHeight() + 'px';
      }
    }

  };

}(this));

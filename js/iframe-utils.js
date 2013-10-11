(function (window) {

  'use strict';

  window.IG = window.IG || {};

  var isEmbedded = window.parent !== window;

  var iframeUtils = window.IG.iframeUtils = {

    /** 
    * Returns true if this window been loaded as an iframe into another document.
    */
    isEmbeddedIframe: function isEmbeddedIframe() {
      return isEmbedded;
    },

    /**
    * Set the document.domain to 'ft.com' if we're in a live environment
    */
    setDocumentDomain: function setDocumentDomain() {
      if (document.domain && /ft\.com$/.test(document.domain)) {
        document.domain = 'ft.com';
      }
    },

    /**
    * Set the target of links by adding a `<base>` element to the `<head>` element.
    * The `target` attribute of the base element will be set to value of the target param.
    * 
    * Common values: `'_blank'`, `'_parent'`, `'_top'`
    *
    * @param {String} target
    */
    targetLinks: function targetLinksToParent(target) {
      if (!iframeUtils.isEmbeddedIframe() || document.getElementsByTagName('base').length) {
        return;
      }

      var base = document.createElement('base');
      base.target = target || '_parent';
      document.getElementsByTagName('head')[0].appendChild(base);
    },

    /**
    * Gets the size of the iframe in the parent window.document
    * 
    * Pass `false` as the first param to prevent calling `getComputedStyle` on the
    * parent window - this will cause a document reflow.
    *
    * However, `getComputedStyle` will only be called if the iframe does not have explicit dimensions - via a stylesheet,
    * the `style` attribute or the `width` and `height` attributes. This should in most cases be set to prevent jank.
    * 
    * @param {Boolean} allowCompute
    */
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

    /**
    * Removes visibility and display styles for the iframe element
    * corresponding to this window.
    */
    showParentFrame: function hideParentFrame() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var s = window.frameElement.style;
      // just removes inline styles
      s.display = '';
      s.visibility = '';
    },

    /**
    * Hide the iframe element on the parent document.
    */
    hideParentFrame: function hideParentFrame() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var s = window.frameElement.style;
      s.display = 'none';
      s.visibility = 'hidden';
    },

    /**
    * Get the width of the content of the current document
    */
    getContentWidth: function getContentWidth() {
      var body = document.body,
          html = document.documentElement;

      return Math.max(
        body.scrollWidth, html.scrollWidth,
        body.offsetWidth, html.offsetWidth,
        body.clientWidth, html.clientWidth
      );
    },

    /**
    * Get the height of the content of the current document
    */
    getContentHeight: function getContentWidth() {
      var body = document.body,
          html = document.documentElement;

      return Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
      );
    },

    /**
    * Get the width and height of the content of the current document.
    * Returns an object e.g. `{width: 100, height: 100}`
    */
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

    /**
    * Measures the content of this document and then resizes the iframe of the parent
    * document to be the same size.
    */
    resizeParentFrameToContentSize: function resizeParentFrameToContentSize() {

      if (!iframeUtils.isEmbeddedIframe()) {
        return;
      }

      var dim = iframeUtils.getContentSize();
      var s = window.frameElement.style;
      s.height = dim.height + 'px';
      s.width = dim.width + 'px';
    },

    /**
    * Looks up the dimensions of iframe on the parent document. For each of these
    * dimensions, if the value is undefined or is zero (`0`) then the iframe is resized
    * along that dimension to fit the content in the current document.
    *
    * The dimensions with values > 0 are left as defined on the iframe. i.e. no resizing
    * happens along these dimensions.
    *
    * If both dimensions of the iframe are 0 or undefined then the behaviour of this method
    * is the same as that of `resizeParentFrameToContentSize`.
    */
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

$(function() {
	$('.share-box-container').each(function() {
		var shareBox = new ShareBox(this);
		shareBox.initWidget();
	});
});

function ShareBox(node) {
	this.node = node;
}

ShareBox.prototype.formSelector = '.share-box .url-box form';
ShareBox.prototype.urlInputSelector = '.share-box .url-box input[type="text"]';
ShareBox.prototype.imageContainer = '.share-box .image-box .image-box-inner';
ShareBox.prototype.imageTagsSelector = '.share-box .image-box .image-box-inner img';
ShareBox.prototype.thumbnailIndexSelector = '.share-box .url-box .thumbnail-index';
ShareBox.prototype.thumbnailPagerSelector = '.share-box .content-box .content-box-inner .thumbnail-pager';
ShareBox.prototype.pagerButtonsSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .buttons';
ShareBox.prototype.pagerTextSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .text';
ShareBox.prototype.toggleThumbnailCheckboxSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .toggle-thumbnail input[type="checkbox"]';
ShareBox.prototype.previousImageButtonSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .thumbnail-pager-button-left';
ShareBox.prototype.nextImageButtonSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .thumbnail-pager-button-right';
ShareBox.prototype.currentPageNumberSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .text .page-number .current';
ShareBox.prototype.totalPageNumbersSelector = '.share-box .content-box .content-box-inner .thumbnail-pager .text .page-number .total';

ShareBox.prototype.initWidget = function() {
	var sb = this;
	$(this.formSelector, this.node).submit(function() {
		sb.setLoadingState();
		var lig = new LinkInfoGrabber($(sb.urlInputSelector, sb.node).val(), 'proxy.php?url=');
		$.ajax({
			url: lig.getRequestUrl(),
			dataType: 'html',
			success: function(raw) {
				var linkInfo = new LinkInfo(raw);
				
				// Hide the URL box and show the rest of the control
				sb.setPreviewState();
				
				sb.setLinkTitle(linkInfo.getLinkTitle());
				sb.setUrl(lig.getUrl());
				sb.setLinkDescription(linkInfo.getLinkDescription());
				
				sb.clearImages();
				$.each(linkInfo.getImageUrls(), function(i, url) {
					sb.addImage(url);
				});
				
				if (sb.imageCount() > 0) {
					sb.setCurrentImageIndex(0);
				
					$(sb.previousImageButtonSelector, sb.node).click(function() {
						sb.previousImage();
					});
					
					$(sb.nextImageButtonSelector, sb.node).click(function() {
						sb.nextImage();
					});
					
					$(sb.toggleThumbnailCheckboxSelector, sb.node).change(function() {
						sb.toggleThumbnail();
					});
				} else {
					$(sb.thumbnailPagerSelector, sb.node).hide();
				}
				
				$('#status').hide();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$('#status').show();
				$('#status').attr('class', 'failure');
				$('#status').html('<p>Failed to retrieve content from URL: ' + lig.getRequestUrl() + ' (<a href="' + lig.getUrl() + '">' + lig.getUrl() + '</a>)</p>');
				$('#status').append('<p>' + textStatus + ' ' + errorThrown + '</p>');
			}
		});
		
		return false;
	});
}

ShareBox.prototype.setInputState = function() {
	this.setState(true, false, false);
}

ShareBox.prototype.setLoadingState = function() {
	this.setState(true, true, false);
}

ShareBox.prototype.setPreviewState = function() {
	this.setState(false, false, true);
}

ShareBox.prototype.setState = function(showInputState, showLoadingState, showPreviewState) {
	$('.share-box .url-box', this.node).toggle(showInputState);
	$('.share-box .url-box form .loading-bar', this.node).toggle(showLoadingState);
	$('.share-box .image-box, .share-box .content-box', this.node).toggle(showPreviewState);
}

ShareBox.prototype.setLinkTitle = function(title) {
	$('.share-box .content-box .content-title', this.node).html(title);
}

ShareBox.prototype.setUrl = function(url) {
	$('.share-box .content-box .content-url', this.node).html(url);
}

ShareBox.prototype.setLinkDescription = function(description) {
	$('.share-box .content-box .content-desc', this.node).html(description);
}

ShareBox.prototype.toggleThumbnail = function() {
	this.setThumbnailEnabled(!this.isThumbnailEnabled());
}

ShareBox.prototype.isThumbnailEnabled = function() {
	return $(this.toggleThumbnailCheckboxSelector, this.node).prop('checked');
}

ShareBox.prototype.setThumbnailEnabled = function(enabled) {
	$(this.toggleThumbnailCheckboxSelector, this.node).prop('checked', !enabled);
	$(this.pagerButtonsSelector, this.node).toggle(enabled);
	$(this.pagerTextSelector, this.node).toggle(enabled);
	if (enabled) {
		this.showImage(this.getCurrentImageIndex());
	} else {
		this.hideImages();
	}
}

ShareBox.prototype.previousImage = function() {
	var index = this.getCurrentImageIndex();
	if (index > 0) {
		this.setCurrentImageIndex(index - 1);
	}
}

ShareBox.prototype.nextImage = function() {
	var index = this.getCurrentImageIndex();
	if (index < this.imageCount() - 1) {
		this.setCurrentImageIndex(index + 1);
	}
}

ShareBox.prototype.imageCount = function() {
	return $(this.imageTagsSelector, this.node).size();
}

ShareBox.prototype.getCurrentImageIndex = function() {
	return parseInt($(this.thumbnailIndexSelector, this.node).val());
}

//@private
ShareBox.prototype.setCurrentImageIndex = function(i) {
	$(this.thumbnailIndexSelector, this.node).val(i);
	$(this.currentPageNumberSelector, this.node).html(i + 1);
	
	if (this.getCurrentImageIndex() == 0)
		$(this.previousImageButtonSelector, this.node).attr('disabled', 'disabled');
	else
		$(this.previousImageButtonSelector, this.node).removeAttr('disabled');

	if (this.getCurrentImageIndex() == this.imageCount() - 1)
		$(this.nextImageButtonSelector, this.node).attr('disabled', 'disabled');
	else
		$(this.nextImageButtonSelector, this.node).removeAttr('disabled');
	
	this.hideImages();
	this.showImage(i);
}

//@private
ShareBox.prototype.clearImages = function() {
	$(this.imageContainer, this.node).empty();
	$(this.totalPageNumbersSelector, this.node).html(this.imageCount());
}

//@private
ShareBox.prototype.addImage = function(url) {
	$('<img src="' + url + '" alt="" />').appendTo(this.imageContainer, this.node);
	$(this.totalPageNumbersSelector, this.node).html(this.imageCount());
	this.hideImages();
}

//@private
ShareBox.prototype.hideImages = function() {
	$(this.imageTagsSelector, this.node).hide();
}

//@private
ShareBox.prototype.showImage = function(i) {
	$(this.imageTagsSelector, this.node).eq(i).show();
}

/*
 * Constructs a new instance of the LinkInfoGrabber class.
 */
function LinkInfoGrabber(url) {
	this.setUrl(url);
}

/*
 * Constructs a new instance of the LinkInfoGrabber class.
 */
function LinkInfoGrabber(url, proxyUrl) {
	this.setUrl(url);
	this.setProxyUrl(proxyUrl);
}

/*
 * The URL to retrieve link info from.
 */
LinkInfoGrabber.prototype.url = '';

/*
 * A relative URL used to proxy cross domain requests.
 */
LinkInfoGrabber.prototype.proxyUrl = '';

/*
 * Gets the URL to retrieve link info from.
 */
LinkInfoGrabber.prototype.getUrl = function() {
	return this.url;
}

/*
 * Sets the URL to retrieve link info from.
 */
LinkInfoGrabber.prototype.setUrl = function(url) {
	var lig = this;
	$.ajax({
		url: 'redirect.php?url=' + url,
		async: false,
		success: function(data) {
			lig.url = data;
		}
	});
}

/*
 * Gets a relative URL used to proxy cross domain requests.
 */
LinkInfoGrabber.prototype.getProxyUrl = function() {
	return this.proxyUrl;
}

/*
 * Sets a relative URL used to proxy cross domain requests.
 */
LinkInfoGrabber.prototype.setProxyUrl = function(proxyUrl) {
	this.proxyUrl = proxyUrl;
}

/*
 * Gets the URL used to make the request. This will either be the plain URL,
 * or a combination of the proxy URL and the plain URL, if a proxy URL has been set.
 */
LinkInfoGrabber.prototype.getRequestUrl = function() {
	if (!isBlank(this.proxyUrl)) {
		return this.proxyUrl + this.url;
	}
	
	return this.url;
}

/*
 * Constructs a new instance of the LinkInfo class.
 */
function LinkInfo(raw) {
	this.raw = raw;
}

/*
 * The raw HTML retrieved from the URL that is used to parse link information.
 */
LinkInfo.prototype.raw = '';

/*
 * Gets the raw HTML retrieved from the URL that is used to parse link information.
 */
LinkInfo.prototype.getRaw = function() {
	return this.raw;
}

/*
 * Sets the HTML that will be used to parse link information.
 */
LinkInfo.prototype.setRaw = function(raw) {
	this.raw = raw;
}

/*
 * Gets the title of the link by trying the following in order
 * until it finds a string or returns an empty string:
 * * Contents of the first title tag
 * * Contents of the first h1 tag
 */
LinkInfo.prototype.getLinkTitle = function() {
	var title = '';
	
	// Try the first title tag
	$(this.raw).filter('title').each(function() { title = $(this).text(); return false; });
	if (!isBlank(title))
		return title;
	
	// No luck, first h1 tag?
	$('h1', this.raw).each(function() { title = $(this).text(); return false; });
	if (!isBlank(title))
		return title;
	
	return 'Enter a title';
}

/*
 * Gets a description of the link by trying the following in order
 * until it finds a string or returns an empty string:
 * * Contents of the first meta tag with the name attribute set to "description"
 * * Contents of the first p tag
 * * Contents of the first div tag
 */
LinkInfo.prototype.getLinkDescription = function() {
	var description = '';
	
	// Look through the meta tags and find the first one
	// that is a description tag; if we find one, return its
	// content and we're done
	$(this.raw).filter('meta').each(function() { if ($(this).attr('name') == 'description') { description = $(this).attr('content'); return false; } });
	if (!isBlank(description))
		return description;
	
	// No meta description? How about paragraphs?
	$('p', this.raw).each(function() { description = $(this).text(); return false; });
	if (!isBlank(description))
		return description;
	
	// Nope, try divs?
	$('div', this.raw).each(function() { description = $(this).text(); return false; });
	if (!isBlank(description))
		return description;
	
	return 'Enter a description';
}

/*
 * Gets an array of all the URLs of the img tags on the page.
 */
LinkInfo.prototype.getImageUrls = function() {
	var urls = new Array();
	$('*', this.raw).each(function() {
		if ($(this).attr('src')) {
			if (isValidUrl($(this).attr('src'))) {
				urls.push($(this).attr('src'));
			}
		}
	
		if ($(this).attr('style')) {
			var urlsFromStyle = $(this).attr('style').match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
			if (urlsFromStyle != null) {
				$.each(urlsFromStyle, function(i, url) {
					if (isValidUrl(url)) {
						urls.push(url);
					}
				});
			}
		}
	});
	
	return eliminateDuplicates(urls);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function isValidUrl(url) {
	return /\.(jpg|jpeg|gif|png)$/i.test(url);
}

function eliminateDuplicates(arr) {
	var i, len = arr.length, out = [], obj = { };

	for (i = 0; i < len; i++) {
		obj[arr[i]] = 0;
	}
	
	for (i in obj) {
		out.push(i);
	}
	
	return out;
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix + "$") == suffix;
}

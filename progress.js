;(function(glob) {
	
	var ProgressBar = function(width) {
		this.width			= width || 500;
		this.value			= 0;
		this.cssNamespace	= "progress";
		this.label			= "Processing";
		
		// Make width segment-compatible
		this.width = this.width - (this.width % 25);
		this.segmentCount = this.width / 25;
		this.percentagePerSegment = 100 / this.segmentCount;
		
		this.ui = null;
	};
	
	ProgressBar.prototype.buildUI = function() {
		var self = this;
		
		function c(tag) {
			var element = tag instanceof HTMLElement ?
								tag :
								document.createElement(tag);
			
			element.setClass = function(className) {
				element.className = self.cssNamespace + "-" + className;
				return element;
			};
			
			element.role = function(role) {
				element.setAttribute("role",role);
				return element;
			};
			
			element.appendTo = function(newEl) {
				newEl.appendChild(element);
				return element;
			};
			
			element.html = function(html) {
				element.innerHTML = html;
				return element;
			}
			
			return element;
		}
		
		self.ui =
			c("div")
				.setClass("widgetcontainer")
				.role("progressbar");
		
		self.ui.halo =
			c("div")
				.setClass("halo")
				.appendTo(self.ui);
		
		self.ui.body =
			c("div")
				.setClass("body")
				.appendTo(self.ui);
		
		self.ui.body.overlay =
			c("div")
				.setClass("overlay")
				.appendTo(self.ui.body);
		
		self.ui.body.obscurerSegment =
			c("div")
				.setClass("obscurer-segment")
				.appendTo(self.ui.body);
		
		self.ui.body.obscurer =
			c("div")
				.setClass("obscurer")
				.appendTo(self.ui.body);
		
		self.ui.label =
			c("label")
				.appendTo(self.ui);
		
		self.ui.label.progressKind =
			c("span")
				.setClass("label-kind")
				.appendTo(self.ui.label)
				.html(self.label || "Processing");
		
		// a bit of space between the label components;
		self.ui.label.appendChild(document.createTextNode(" "));
		
		self.ui.label.progressAmount =
			c("span")
				.setClass("label-amount")
				.appendTo(self.ui.label)
				.html("0%");
		
		self.updateUI();
		return self;
	};
	
	ProgressBar.prototype.updateUI = function() {
		var self = this,
			totalSegments = 0,
			obscuredSegments = 0,
			completeSegments = 0,
			partialSegment = 0,
			marginLeft = 0;
		
		// In case we want to indicate a different kind of progress
		self.ui.label.progressKind.innerHTML = self.label;
					
		if (self.value >= 100) {
			self.ui.label.progressAmount.innerHTML = "Done";
			
			self.ui.body.obscurer.style.display = "none";
			self.ui.body.obscurerSegment.style.display = "none";
		} else {
			self.ui.label.progressAmount.innerHTML =
				(Math.floor(self.value * 10)/10) + "%";
			
			totalSegments = self.width / 25;
			completeSegments = (self.value / self.percentagePerSegment)|0;
			obscuredSegments = totalSegments - completeSegments;
			partialSegment =
				(self.value % self.percentagePerSegment) /
					self.percentagePerSegment;
			
			
			if (obscuredSegments) {
				self.ui.body.obscurer.style.display = "block";
				
				marginLeft = completeSegments * 25;
				if (partialSegment > 0) marginLeft += 25;
				
				self.ui.body.obscurer.style.marginLeft = marginLeft + "px";
				self.ui.body.obscurer.style.width = (self.width-marginLeft) + "px";
				
			} else {
				self.ui.body.obscurer.style.display = "none";
			}
			
			if (partialSegment > 0) {
				self.ui.body.obscurerSegment.style.display = "block";
				self.ui.body.obscurerSegment.style.opacity = 1-partialSegment;
				marginLeft = completeSegments * 25;
				
				if (completeSegments) {
					self.ui.body.obscurerSegment.style.marginLeft = marginLeft + "px";
				}
			} else {
				self.ui.body.obscurerSegment.style.display = "none";
			}
		}
		
		return self;
	};
	
	ProgressBar.prototype.appendTo = function(newParent) {
		if (!this.ui) this.buildUI();
		
		if (!(newParent instanceof HTMLElement)) return;
		
		return newParent.appendChild(this.ui);
	};
	
	ProgressBar.prototype.setValue = function(value) {
		var newValue =
			!isNaN(parseFloat(value)) ? parseFloat(value) : this.value;
		
		if (newValue !== this.value) {
			this.value = newValue;
			this.updateUI();
		}
	};
	
	
	// Make it public
	this.ProgressBar = ProgressBar;
	
})(this);
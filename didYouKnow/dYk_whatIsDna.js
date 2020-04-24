(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value;
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Image = function() {
	this.initialize(img.Image);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1554,1099);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#97999B").p("Az8AAQAAkDBijiQBhjgCrioQCsinDnhiQDphiESAAQELAADpBiQDpBiCuCnQCuCnBiDhQBiDhAAEEQAAEGhiDkQhiDliuCnQiuCmjpBfQjoBekMAAQkTAAjoheQjoheirinQiriohhjkQhijmAAkEg");
	this.shape.setTransform(149.3,145.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#F9B9AE","#F8ACA1","#F58C83","#F0555D","#EF4254"],[0,0.153,0.463,0.89,1],-47.4,-67.1,0,-47.4,-67.1,165.3).s().p("An7R7QjohfirimQiriohhjkQhijmAAkEQAAkDBijiQBhjgCrioQCsioDnhhQDphiESAAQELAADpBiQDoBiCvCnQCuCnBiDhQBiDhAAEEQAAEGhiDkQhiDliuCnQiuCmjpBfQjoBekMAAQkTAAjoheg");
	this.shape_1.setTransform(149.3,145.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(20.6,20.7,257.4,250.2), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCB35").s().p("AwoJGMAAAgi3QC2hfEAhQQEBhQGAAAQH0AAEgEBQDKC3A8ERIAAIAQglDChbCgQiYEHjpDWQjnDVkOC6QkGC2jtDLQjpDHiYDwQiRDkgHEuQhPqSAAqZg");
	this.shape.setTransform(106.475,190.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,213,381), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F79341").s().p("Aspe6QiDqnhSqjIgCgRQAHktCRjlQCYjuDojIQDujLEGi1QENi6DojWQDpjWCXkIQBbifAljDIAATuQAAKjhRKYQgPCCgSB9QgOAsgHAnIjLP4g");
	this.shape.setTransform(102.525,197.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,205.1,395.7), null);


(lib.Path_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCB35").s().p("Aspe6QiDqnhSqjIgCgRQAHktCRjlQCYjuDojIQDujLEGi1QENi6DojWQDpjWCXkIQBbifAljDIAATuQAAKjhRKYQgPCCgSB9QgOAsgHAnIjLP4g");
	this.shape.setTransform(102.525,197.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,205.1,395.7), null);


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#29BDC1").s().p("EgQ4AmGQBRqZAAqjIAAzuQAYiDABiPQgBh7gYhyIAA/hIPEAAQC/BzCgCNQGAFQDPHcQDPHcAAJEQAAIviYGOQiZGPjrEpQjrEpkYDXQlOEAjDCTQj9C+i2C0QiXCTg5CwQASh+APiBg");
	this.shape.setTransform(111.4,269.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,222.8,538.6), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F79341").s().p("AMjIpQkgkBn0AAQmAAAkBBQQkABPi2BfIAA4WMAhRAAAIAAfgQg8kQjKi3g");
	this.shape.setTransform(106.475,100.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,213,201.7), null);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2998C2").s().p("AMjIpQkgkBn0AAQmAAAkBBQQkABPi2BfIAA4WMAhRAAAIAAfgQg8kQjKi3g");
	this.shape_2.setTransform(106.475,100.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,213,201.7), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EF4254").s().p("AhutHIDdAAIAAYWIgFADQh9BDhbAzg");
	this.shape.setTransform(11.1,83.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,22.2,168), null);


(lib.Tween16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#373535").s().p("AgFAOIgFgEQgCgBgBgDIgBgGIABgFIADgEIAFgEIAFgBIAGABIAEAEIAEAEIABAFIgBAGQgCADgCABIgEAEIgGABg");
	this.shape.setTransform(282.4,82.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgFAFgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_1.setTransform(274.525,78.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgFgMABgOQAAgNADgMQAFgLAGgIQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMACAIQADAIAFAGQAGAGAHADQAIACAGAAQAIAAAGgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgFQgFgEgGgDQgFgCgIAAQgNAAgKAJg");
	this.shape_2.setTransform(263.1,78.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_3.setTransform(253.775,75.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgHgCgHQgDgHABgMIAAhNIAUAAIAABNQABANAGAIQAHAIANAAQAIAAAIgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_4.setTransform(243.9,78.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgHADQgGACgFAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHALgNAEQgLAFgOgBQgKABgKgFg");
	this.shape_5.setTransform(231.975,78.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#373535").s().p("AgSA6QgJgDgKgKQgHgIgEgMQgFgKAAgQQABgOADgLQAFgMAHgHQAHgIALgEQAKgFAMAAQAMAAAIAEQAJADAHAIQAGAGAFALQADAKAAAMIgBAHQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJQgIAEgFACIgNADIgNABQgMABgKgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgFgGgCQgGgCgGAAQgPAAgJAJg");
	this.shape_6.setTransform(219.85,78.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_7.setTransform(210.5,75.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgIgFgLQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgMAFgNgBQgLABgMgFgAgPgqQgGAEgFAFQgEAFgDAJQgCALAAAIQAAAJACAKQADAKAEAFQAFAFAGAEQAIACAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_8.setTransform(200.75,78.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373535").s().p("AA9A+IAAhNQAAgPgHgHQgFgHgNAAQgFABgFABIgIAFIgFAKQgDAFAAAHIAABNIgUAAIAAhNQAAgOgGgIQgGgHgLAAQgJAAgFAFQgIAFgFAGIAABaIgWAAIAAh5IANAAQAEAAACAFIABAMQAHgIAIgFQAJgGALAAQANAAAHAHQAHAGADAMQABgEAFgHQAFgFAFgCQAFgEAGgCIAMgBQAKAAAHAEQAHACAFAHQAFAEADAJQADAKAAAKIAABNg");
	this.shape_9.setTransform(184.4,78.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAgBQgBAAAAgBQAAAAAAgBIgQgpIhNAAIgQApIgDAEQgBACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgbhFIgFgQg");
	this.shape_10.setTransform(161.625,75.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABCFIgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_11.setTransform(144.375,75.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#373535").s().p("AAqBWQgFAAgEgFIgsg9IgEgFIgHgBIgSAAIAABIIgWAAIAAirIAwAAQAPAAAMADQANAEAGAGQAIAGAEAJQAEAJAAALQAAAJgDAIQgEAJgEAFQgFAGgJAEQgHAEgLACQAFADADAFIAzBEgAgogCIAZAAQAJAAAIgCQAGgCAGgFQAHgFABgGQADgFAAgJQAAgQgKgHQgKgIgTAAIgaAAg");
	this.shape_12.setTransform(128.55,75.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgKALAAAWQAAALADAJQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_13.setTransform(108.025,75.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#373535").s().p("AAeA+IAAhNQgBgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABZIgWAAIAAh5IANAAQAGAAAAAFIABANQAHgIALgGQAKgGAMAAQAKAAAIAEQAIAEAEAFQAFAGADAIQACAIAAALIAABNg");
	this.shape_14.setTransform(95.25,78.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_15.setTransform(82.175,78.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAEADAEIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgOAAgJgDg");
	this.shape_16.setTransform(66.325,78.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#373535").s().p("AAdA+IAAhNQABgNgHgIQgGgIgNAAQgIABgJAEQgIAFgHAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHAEQAJAEAFAFQAEAGADAIQACAIABALIAABNg");
	this.shape_17.setTransform(54.7,78.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_18.setTransform(44.825,75.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgOQAAgNAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_19.setTransform(35.425,78.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgBIADgCIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_20.setTransform(24.675,76.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgHgIgEgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAFAHAGANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAHgCAHQgCAMAAAHQAAAIACALQADAJAEAGQAFAFAGAEQAHACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_21.setTransform(13.55,78.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAABABQAAAAABAAQAAAAAAABIACAEIABATQAHgMAJgIQAIgHAMAAIAJABIAIAEIgCAQQgCADgDAAIgEgCIgKgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_22.setTransform(2.65,78.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABABAEIACAOQAHgJAKgGQALgFAMAAQAJAAAKADQAIAEAGAJQAGAHADAMQAEANAAAOQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgHAFgHAJIAAA6QAHAIAGADQAGADAJABQAQAAAJgNQAJgMAAgVQAAgNgCgIQgCgIgEgFQgDgGgGgDQgFgCgJAAQgJAAgIAEg");
	this.shape_23.setTransform(-8.925,80.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#373535").s().p("AgLAbQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIABgEIAHgIIAEgHIABgGIgBAAIgFgBIgFgDIgDgFIgBgGIABgFIADgFIAFgDIAFAAIAGAAIAFAEIADAGIAAAHQABAGgCAFQgCAFgDAFQgBAEgFAIIgJAKg");
	this.shape_24.setTransform(-23.2,84.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgJgIgDgMQgFgMABgOQAAgNADgMQAEgJAHgKQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQACAMACAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAFgCACgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgPAAgJAJg");
	this.shape_25.setTransform(-32.1,78.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_26.setTransform(-41.425,75.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABAAAEIACAOQAIgJAKgGQAKgFAMAAQAKAAAJADQAJAEAGAJQAGAHADAMQADAKAAARQAAAMgDALQgEAMgGAJQgHAIgKAFQgJAFgNAAQgJAAgKgEQgIgEgGgHIAAA2gAgRg8QgIAGgHAIIAAA6QAHAIAHADQAGADAJABQAQAAAJgNQAKgMAAgVQAAgLgDgKQgCgIgEgFQgEgHgFgCQgGgCgIAAQgIAAgJAEg");
	this.shape_27.setTransform(-50.6,80.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#373535").s().p("AA9A+IAAhNQAAgOgGgIQgHgHgLAAIgKACQgGADgDACIgGAKQgCAIAAAEIAABNIgUAAIAAhNQAAgPgGgHQgFgHgMAAQgJAAgFAFQgGADgHAIIAABaIgVAAIAAh5IAMAAQAGAAAAAFIABAMQAGgIAKgFQAIgGALAAQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAGAHQAFAGADAHQACAKAAAKIAABNg");
	this.shape_28.setTransform(-67.45,78.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#373535").s().p("AgbA9QgFgCgFgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAJgFAOgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgFACIgJAEIgHAEQgBACgEAAIgEgBIgCgDIgEgGQAKgKALgFQAMgFANAAQALAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgDgLIgJAHQgEAEgGACIgKAEIgMABQgHAAgHgCgAACAIQgKADgGACQgGADgDAEQgEAFAAAFQAAAFACADQACAEACACQADACAEABIAIABIAJgBIAJgDIAPgMIAAgZQgPAAgKABg");
	this.shape_29.setTransform(-83.7,78.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#373535").s().p("AAlA9IgFgBIgggzIgDAGIgcAqIgCADIgEABIgTAAIAqg9Igpg8IAVAAIAEABIACADIAdAtIADgGIAagnIACgDIADgBIAUAAIgpA7IArA+g");
	this.shape_30.setTransform(-95.65,78.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgEgNQgFgNAAgNQAAgOAFgLQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAJAAANIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgNADIgMABQgNABgKgFgAgUglQgJAJgCAQIBBAAQAAgGgBgIQgDgGgEgFQgFgFgFgCQgFgCgHAAQgPAAgJAJg");
	this.shape_31.setTransform(-107.3,78.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACIACAEIACATQAGgMAIgIQAJgHAMAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgJAHgDAMIAABMg");
	this.shape_32.setTransform(-122.4,78.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgIgFgLQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQALAEAHAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgGAJgMAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIAEQAGACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_33.setTransform(-134.55,78.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgMADgHQADgIAGgGQAFgGAGgDQAHgCAKAAQAKAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgFACgCAEQgEADgBAFQgCAHAAAGIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_34.setTransform(-145.15,75.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#373535").s().p("AgLAbQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIABgEIAHgIIAEgHIABgGIgBAAIgFgBIgFgDIgDgFIgBgGIABgFIADgFIAFgDIAFAAIAGAAIAFAEIADAGIABAHIgCALIgEAKQgCAEgGAIIgIAKg");
	this.shape_35.setTransform(-156.425,84.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAFgCIAHgDQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgFgBgFgEQgEgDgDgGQgDgGAAgIQAAgGADgHQAEgHAEgEQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDABgCAEQgCAEAAADQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgDAIgFAEQgGAFgJAEQgIACgKAAQgOAAgKgDg");
	this.shape_36.setTransform(-164.375,78.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#373535").s().p("AgJBYIAAivIAUAAIAACvg");
	this.shape_37.setTransform(-172.5,75.425);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_38.setTransform(-178.65,75.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#373535").s().p("AgRA6QgLgDgIgKQgIgIgEgMQgEgMgBgOQAAgNAEgMQAEgJAIgKQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAKABAMQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAGAHQAFAGAHADQAIACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgCgFQgDgGgDgFQgEgEgGgDQgHgCgGAAQgPAAgIAJg");
	this.shape_39.setTransform(-188.05,78.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_40.setTransform(-199.675,78.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgCQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgMADgHQACgIAHgGQAFgGAGgDQAIgCAKAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgEACgEAEQgCACgCAGQgCAFAAAIIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_41.setTransform(-214.1,75.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgGgFgNQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIAEQAGACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_42.setTransform(-224.9,78.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgIgNAAQgJABgIAEQgJAGgGAGIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIAEQAHADAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_43.setTransform(-242.725,78.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgIgIgDgLQgEgKAAgQQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgGAIgMAFQgLAFgNgBQgNABgKgFgAgPgqQgHAEgEAFQgFAHgCAHQgCAJAAAKQAAAMACAHQADAJAEAGQAEAFAHAEQAHACAIAAQASAAAJgLQAJgMAAgWQAAgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_44.setTransform(-256.2,78.2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_45.setTransform(-265.925,75.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgBIADgCIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_46.setTransform(-273.525,76.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACQgFABgEADIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgDAFAAAFQABAFABADIAFAGQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_47.setTransform(-284.25,78.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_48.setTransform(-295.525,78.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_49.setTransform(-304.425,75.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_50.setTransform(-310.575,75.425);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAEAGAJQAGAHADAMQAEAKAAARQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgHgFgGQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_51.setTransform(-319.775,80.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#373535").s().p("AgSA6QgJgDgKgKQgHgIgEgMQgFgKAAgQQABgOADgLQAFgMAHgHQAGgHAMgFQAKgFAMAAQAMAAAIAEQAJADAHAIQAGAGAFALQADAKAAAMIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgIAEgEACIgOADIgMABQgNABgKgFgAgUglQgIAJgDAQIBCAAQgBgIgCgGQgCgGgEgFQgEgFgGgCQgGgCgGAAQgPAAgJAJg");
	this.shape_52.setTransform(-333.2,78.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQABAAAAAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgLAKgJQAJgHAMAAIAJABQAEACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgJgBQgMAAgGAHQgIAGgEANIAABMg");
	this.shape_53.setTransform(-343.7,78.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgMAAgOQAAgNAFgMQADgLAHgIQAIgHAKgFQALgFANAAQALAAAJAEQAJAEAHAHQAGAGAEALQAEAKgBAMQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQABAMABAIQADAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgGAEQgEAEgHACIgNADIgNABQgLABgMgFgAgUglQgIAJgCAQIBAAAQAAgJgBgFQgDgGgEgFQgEgEgFgDQgHgCgGAAQgOAAgKAJg");
	this.shape_54.setTransform(-360.1,78.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgIAKgFQAJgFAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_55.setTransform(-372.875,75.425);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgBIADgCIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgHAHgGACQgIACgIAAQgOABgHgJg");
	this.shape_56.setTransform(-384.175,76.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgHgIgMAAQgIABgJAEQgIAFgHAHIAABZIgVAAIAAh5IAMAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHAEQAJAEAEAFQAEAGAEAIQACAKABAJIAABNg");
	this.shape_57.setTransform(-399.8,78.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_58.setTransform(-409.675,75.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgJAGgNAAQgJAAgKgEgAgVgGQgKAKAAAXQAAAJACALQACAJAEAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_59.setTransform(-424.575,75.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_60.setTransform(-433.875,75.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_61.setTransform(-443.225,78.175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIAKgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJgBAKQABAMACAHQACAKAEAFQAEAFAIADQAHADAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgHADg");
	this.shape_62.setTransform(422.55,49.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_63.setTransform(411.425,47.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAHAEAFQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_64.setTransform(397.825,47.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAEgIAIIAABYIgVAAIAAh4IANAAQAFAAAAAFIACANQAHgIALgGQAJgGANAAQAJAAAJAEQAHADAFAGQAEAGAEAIQADAKgBAJIAABMg");
	this.shape_65.setTransform(386.85,49.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_66.setTransform(376.975,46.7);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQAAAAABAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgMAKgIQAJgHAMAAIAJABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAGgEANIAABMg");
	this.shape_67.setTransform(369.65,49.275);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJAKgGQALgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEANAAAOQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgHAFgHAJIAAA6QAHAIAGADQAGADAJABQAQAAAJgNQAJgMAAgVQAAgNgCgIQgCgIgEgFQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_68.setTransform(358.075,51.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#373535").s().p("AgdAJIAAgRIA6AAIAAARg");
	this.shape_69.setTransform(346.8,48.275);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgEgMgBgPQAAgMAFgMQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAKAAAMQAAAGAAABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJAEALQACAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgKABgMgFgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgCgGgEgFQgFgFgFgCQgHgCgHAAQgOAAgIAJg");
	this.shape_70.setTransform(336.3,49.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgGgCgIQgDgHAAgMIAAhNIAWAAIAABNQgBANAHAIQAGAIANAAQAJAAAIgFQAIgEAHgIIAAhZIAWAAIAAB5IgOAAQgEAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgIgDg");
	this.shape_71.setTransform(323.25,49.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_72.setTransform(313.625,46.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#373535").s().p("AgSBVQgHgEgIgJIgBALQAAAEgFAAIgOAAIAAivIAWAAIAABIQAJgJAIgFQAKgFAMAAQALAAAHAEQAJAFAGAHQAGAHAEAMQACALABAPQgBAOgDALQgDALgIAJQgGAJgKAEQgKAFgMAAQgKAAgJgEgAgRgNQgJAGgFAHIAAA6QAFAIAIADQAGAEAJAAQAQAAAKgNQAIgMAAgWQAAgNgCgHQgCgIgDgFQgFgGgFgCQgFgDgJAAQgJAAgIAFg");
	this.shape_73.setTransform(304.35,46.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgJAEIgIAEQgCACgDAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgDgLIgJAHQgFAEgEACIgKAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQgBAFACADQACAEADACQACACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgKABg");
	this.shape_74.setTransform(286.25,49.375);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgIgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAGAHAFANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAFgNgBQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_75.setTransform(269.05,49.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_76.setTransform(257.875,47.5);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#373535").s().p("AgZBVQgKgFgFgHQgFgHgFgMQgCgLAAgQQgBgOAEgLQAEgKAGgJQAHgJAKgEQAJgFANAAQAKAAAIAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgKAGgMAAQgJAAgJgEgAgWgGQgIALgBAWQAAANACAHQADAJADAFQAEAGAGACQAFADAIAAQAKAAAIgFQAIgGAGgHIAAg6QgFgIgIgDQgIgEgHAAQgRAAgJANg");
	this.shape_77.setTransform(241.6,46.725);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgEgNQgEgNgBgOQABgNAEgLQAEgLAGgIQAIgHAKgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAKgBAMIgBAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAMACAIQAEAJAEAFQAGAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgHAFQgFAEgGACIgOADIgMABQgMABgLgFgAgUglQgJAJgBAQIBAAAQAAgGgBgIQgCgGgFgFQgFgFgFgCQgGgCgGAAQgPAAgJAJg");
	this.shape_78.setTransform(229.05,49.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQAAABAAAAIACATQAGgMAJgIQAJgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgMAAgFAHQgIAGgFANIAABMg");
	this.shape_79.setTransform(218.6,49.275);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACQgFABgFADIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQAKgFAOAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgBgBgBgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQAAAFACADQABAEACACQACACAFABIAIABIAJgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_80.setTransform(206.85,49.375);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEAKAAARQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgHgFgGQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_81.setTransform(194.825,51.35);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgMAAIgKACQgFADgDACIgGAJQgCAGAAAHIAABMIgUAAIAAhMQAAgNgGgJQgFgHgMAAQgJAAgFAFQgGADgHAIIAABZIgWAAIAAh4IANAAQAGAAAAAFIABAMQAHgIAJgFQAIgGALAAQANAAAHAHQAHAHADALIAGgLQAFgFAFgCQAFgEAGgCIAMgBQAKAAAHAEQAHACAFAHQAHAGACAHQACAKAAAKIAABMg");
	this.shape_82.setTransform(178,49.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgKAAgQQAAgOAEgLQAEgMAIgIQAIgIAKgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgEALgIAIQgHAJgLAEQgKAFgOgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_83.setTransform(161.325,49.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgGgIgFgMQgEgNAAgNQAAgOAEgKQAEgMAHgIQAHgIAKgFQAMgFAMAAQANAAAKAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgHADQgFACgGAIQgFAFgCAJQgCAHAAALQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgLAFgOgBQgKABgKgFg");
	this.shape_84.setTransform(149.275,49.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgDgNAAgOQAAgNADgLQAEgLAHgIQAHgHALgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAKAAAMIgCAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMACAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgFAEgGACIgOADIgNABQgLABgLgFgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgFgCgIAAQgOAAgJAJg");
	this.shape_85.setTransform(132.5,49.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#373535").s().p("AgSBVQgIgFgGgIIgBALQgBAEgFAAIgOAAIAAivIAWAAIAABIQAIgJAJgFQAKgFAMAAQAKAAAJAEQAIAFAGAHQAGAIADALQAEAKAAAQQAAAMgEANQgDALgHAJQgHAJgKAEQgJAFgNAAQgKAAgJgEgAgRgNQgIAFgGAIIAAA6QAHAJAGACQAGAEAJAAQAQAAAJgNQAKgLAAgXQAAgLgDgJQgBgIgFgFQgDgGgGgCQgFgDgIAAQgJAAgJAFg");
	this.shape_86.setTransform(120.025,46.725);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_87.setTransform(101.675,49.3);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHACAGAHQAFAFADAKQADAHAAALIAABNIgPgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADQACAEADACQACACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_88.setTransform(88.575,49.375);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgIgKgDgKQgFgMABgOQAAgMADgMQAEgMAHgIQAJgIAJgFQALgFANAAQAOAAAJAFQAJADAIAIIgFAIIgCACIgEAAIgEgBIgFgDIgHgEQgFgBgHAAQgJAAgGADQgGADgFAHQgFAGgCAIQgDAJAAAJQAAALADAIQADAJAEAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAIAHAHQgJALgMAEQgLAFgNgBQgLABgKgFg");
	this.shape_89.setTransform(77.3,49.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_90.setTransform(62.375,47.5);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#373535").s().p("AgLBWIAAirIAXAAIAACrg");
	this.shape_91.setTransform(54.225,46.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#373535").s().p("AgFAOIgEgEQgCgBgCgDIgBgGIABgFQACgDACgBIAEgEIAFgBIAGABIAFAEIADAEIABAFIgBAGIgDAEIgFAEIgGABg");
	this.shape_92.setTransform(43.35,54.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgJAFgGAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIAEQAHADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_93.setTransform(34.275,49.3);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#373535").s().p("AgXA6QgMgFgGgIQgJgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAIgIQAHgIALgEQAKgFANAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgHAIgLAFQgKAFgOgBQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgMgBgWQABgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_94.setTransform(20.8,49.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_95.setTransform(11.075,46.7);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_96.setTransform(3.475,47.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAMgLAKgEQAKgFAOAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgDgLIgJAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQAAAFACADQABAEACACQADACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_97.setTransform(-7.25,49.375);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgLAAIgLACQgFADgDACIgFAJQgCAGAAAHIAABMIgVAAIAAhMQAAgNgFgJQgGgHgMAAQgIAAgHAFQgHAEgFAHIAABZIgWAAIAAh4IAOAAQAEAAABAFIABAMQAIgIAHgFQAJgGALAAQANAAAHAHQAHAHADALQABgEAGgHQAFgFAEgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAFAHQAHAGABAHQAEAKAAAKIAABMg");
	this.shape_98.setTransform(-22.85,49.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIABATQAHgMAJgIQAIgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgJAHgEAMIAABMg");
	this.shape_99.setTransform(-37.05,49.275);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgHgFgMQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQALAEAHAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgHAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAHADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_100.setTransform(-49.2,49.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgJAFgFQAHgGAGgDQAGgCALAAQAJAAAGACIAAALQgBABAAAAQAAABAAAAQgBAAAAAAQAAABgBAAIgJAAQgFAAgFABQgFACgCAEQgEACgBAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_101.setTransform(-59.825,46.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_102.setTransform(-70.475,49.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_103.setTransform(-80.325,46.7);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#373535").s().p("AgRBXIAAhmIgOgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIAUAAIAAgMQAAgLADgHQABgHAHgHQAGgGAGgDQAGgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgIAAQgGAAgFABQgFACgCAEQgDACgCAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_104.setTransform(-92.05,46.75);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQAEgMAHgIQAIgIAKgEQAKgFAOAAQAOAAAJAFQALAEAHAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgMgBQgNABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJAAAKQAAAMACAHQACAKAEAFQAEAFAIADQAGADAJAAQARAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgRAAQgJAAgGADg");
	this.shape_105.setTransform(-102.85,49.4);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgNAAgOQAAgNAFgLQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAGAGAEALQAFAJgBANIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgMADIgOABQgLABgLgFgAgUglQgJAJgCAQIBCAAQAAgGgCgIQgCgGgEgFQgFgFgFgCQgHgCgHAAQgOAAgJAJg");
	this.shape_106.setTransform(-120.45,49.4);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgKAFgGQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAGgGAIgCQAJgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAHgEAJQgEAIgFAEQgGAFgJADQgIADgJAAQgKAAgGgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgWgDIgMAAQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAGgCQAFgCAEgDQADgDACgFQACgGAAgEQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_107.setTransform(-132.725,51.475);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgKAEIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgCgLIgKAHQgEAEgFACIgKAEIgNABQgIAAgFgCgAACAIIgQAFQgGAEgDADQgDAFgBAFQABAFACADQABAEACACQACACAFABIAIABIAJgBIAJgDIAPgMIAAgZQgOAAgLABg");
	this.shape_108.setTransform(-145.25,49.375);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAGgMAJgIQAKgHALAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgEAMIAABMg");
	this.shape_109.setTransform(-154.9,49.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAEgMAIgIQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAJAIQAHAIAEAMQAEALAAAOQAAAQgEAKQgEALgHAIQgIAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgHAEgEAFQgEAFgCAJQgDAJAAAKQAAAMADAHQACAKAEAFQAEAFAHADQAIADAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_110.setTransform(-167.05,49.4);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_111.setTransform(-178.175,47.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAFADADIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgOAAgJgDg");
	this.shape_112.setTransform(-187.975,49.4);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgMAAIgJACIgJAFIgGAJQgCAGAAAHIAABMIgUAAIAAhMQAAgOgGgIQgFgHgMAAQgJAAgGAFQgHAEgFAHIAABZIgVAAIAAh4IAMAAQAFAAABAFIABAMQAIgIAIgFQAHgGAMAAQANAAAHAHQAHAHADALQACgEAFgHQAEgFAFgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAGAHQAEAEAEAJQACAKAAAKIAABMg");
	this.shape_113.setTransform(-207.4,49.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAIABATQAHgMAJgIQAIgHAMAAIAJABQAFACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAIgGgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_114.setTransform(-221.625,49.275);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgEgMgBgPQAAgNAEgLQAEgLAIgIQAGgHAMgFQAKgFAMAAQALAAAKAEQAJAEAGAHQAHAGAEALQADAKABAMIgBAHQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAJADALQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgNADIgMABQgLABgMgFgAgTglQgKAJgBAQIBBAAQAAgGgCgIQgDgGgEgFQgEgFgFgCQgHgCgHAAQgOAAgIAJg");
	this.shape_115.setTransform(-233.4,49.4);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_116.setTransform(-244.125,47.5);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgHgEgDgGQgDgGAAgGQAAgKAFgGQAGgGAKgEQgFgCgEgEQgCgEAAgHIABgFIACgFIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgKAEgHQADgHAGgFQAHgGAHgCQAJgDAKAAQAIAAAGACQAHACAFADIAhAAIAAAIQABAEgGABIgOACQAEAHAAALQAAAJgDAHQgEAIgGAEQgFAGgJACQgHADgKAAQgJAAgHgCQgDACgDADQgCACAAADQAAAEADACQAFADAFABIAbABIAPABQAGABAHADQAGAEADAFQADAFABAJQAAAIgFAHQgDAIgIAFQgJAHgJACQgKAEgNAAQgLAAgLgDgAghAmQgDAEAAAHQAAAFACACQACAEAEADQAEACAHACQAGABAJAAQAIAAAGgBQAIgCAEgDQADgCAEgFQADgFAAgEQAAgEgDgDQgDgDgDgCIgLgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgHAHAAALQAAAGADAEQABAFADADQAEADAEACQAIACAEAAQADAAAIgCQADgBAFgEIAFgIQABgEAAgGQABgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_117.setTransform(-259.25,51.475);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_118.setTransform(-272.025,49.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgKAAgQQAAgOAEgLQAEgMAHgIQAIgIALgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIADAMQAFAMAAANQAAAOgFAMQgDALgIAIQgHAJgLAEQgKAFgOgBQgMABgLgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAGQAEAFAHADQAHADAIAAQASAAAJgLQAIgNAAgVQAAgUgIgNQgJgMgSAAQgIAAgHADg");
	this.shape_119.setTransform(-285.5,49.4);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_120.setTransform(-295.275,46.625);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAFgCIAHgDQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgFgBgFgEQgEgDgDgGQgDgGAAgIQAAgGADgHQAEgHAEgEQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDABgCAEQgCAEAAADQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgDAIgFAEQgGAFgJAEQgIACgKAAQgOAAgKgDg");
	this.shape_121.setTransform(-308.325,49.4);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_122.setTransform(-316.425,46.7);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#373535").s().p("AA+BWIgEgCIgDgEIgRgpIhLAAIgRApIgCAEQgDACgDAAIgSAAIBGirIAWAAIBECrgAgBg2IgeBMIA/AAIgghVg");
	this.shape_123.setTransform(-332.3,46.875);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#373535").s().p("AA6BWIgFgBIgEgDIhiiBIABAGIAAB/IgUAAIAAirIALAAIAFABIAEADIBiCBIgBgGIAAh/IAUAAIAACrg");
	this.shape_124.setTransform(-349.55,46.875);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#373535").s().p("AhJBWIAAirIBAAAQASAAAQAGQAOAGAMAMQALALAHAQQAFAQAAASQAAAUgFAPQgHAQgLALQgMAMgOAGQgQAGgSAAgAgyBDIApAAQANAAALgEQAMgFAHgJQAIgIAEgNQAEgKABgSQgBgQgEgLQgEgNgIgIQgHgJgMgFQgLgEgNAAIgpAAg");
	this.shape_125.setTransform(-367.15,46.875);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgCQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQABgKACgIQACgIAGgGQAHgGAGgDQAHgCAKAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgEACgDAEQgEACgBAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_126.setTransform(-385.3,46.75);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEANAAAMQAAANgEANQgEALgIAIQgHAJgLAEQgLAFgNgBQgLABgMgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIADQAGADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_127.setTransform(-396.1,49.4);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgFgMQgDgNAAgOQgBgNAEgLQAFgMAGgHQAIgHAKgFQALgFAMAAQALAAAJAEQAJADAHAIQAHAGADALQAFALAAALIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgEAEgIACIgMADIgOABQgMABgKgFgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgFQgGgFgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_128.setTransform(-413.7,49.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_129.setTransform(-423.025,46.625);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQAEgMAHgIQAIgIAKgEQAKgFAOAAQANAAAKAFQALAEAHAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgMgBQgMABgMgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJAAAKQAAAMACAHQACAKAEAFQAEAFAIADQAGADAJAAQASAAAIgLQAJgNAAgVQAAgUgJgNQgIgMgSAAQgJAAgGADg");
	this.shape_130.setTransform(-432.8,49.4);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIABATQAGgMAKgIQAIgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgJgBQgMAAgGAHQgIAHgFAMIAABMg");
	this.shape_131.setTransform(-443.65,49.275);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAEgHAIIAABYIgWAAIAAh4IANAAQAEAAACAEIABAOQAIgJAKgFQAKgFAMgBQAKAAAIAEQAIAEAEAFQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_132.setTransform(431.5,20.5);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_133.setTransform(421.625,17.9);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgDgDgHQgDgFAAgJQAAgIAEgGQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgKAEIgGAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQAKgFAOAAQALAAAIAEQAIADAFAGQAFAGADAJQADAJAAAJIAABNIgKAAIgFgBQgCgBAAgDIgDgLQgFAFgEACQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_134.setTransform(412.275,20.575);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgHgIgLAAIgKACQgGADgCADIgHAIQgBAJAAAEIAABMIgVAAIAAhMQAAgOgFgHQgGgIgMAAQgIAAgHAFQgFADgHAIIAABZIgWAAIAAh4IAOAAQAEAAABAEIACANQAGgIAJgFQAIgFALgBQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgDQAFgDAGgCIAMgBQAJAAAIAEQAIADAFAGQAFAGACAHQAEAKAAAKIAABMg");
	this.shape_135.setTransform(396.65,20.5);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgIgIgEgMQgFgMABgPQAAgMADgMQAEgJAIgKQAHgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgHgCgGAAQgOAAgKAJg");
	this.shape_136.setTransform(375.7,20.6);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgJAFgGAHIAABYIgWAAIAAivIAWAAIAABHQAJgJAIgEQAJgFAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_137.setTransform(362.925,17.825);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#373535").s().p("AgKBWIAAiXIg4AAIAAgUICFAAIAAAUIg3AAIAACXg");
	this.shape_138.setTransform(349.025,18.075);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#373535").s().p("AgFAOIgFgEIgDgEIgBgGIABgFIADgEIAFgEIAFgBIAFABIAGAEQACABABADIABAFIgBAGQgBADgCABIgGAEIgFABg");
	this.shape_139.setTransform(334.8,25.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgGgCgEgDQgEgDgDgGQgDgGAAgIQAAgGADgHQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDACgCADQgCACAAAFQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgCAHgGAGQgGAEgJAEQgJACgKAAQgNAAgKgDg");
	this.shape_140.setTransform(326.875,20.6);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgEgNAAgOQAAgNAEgLQAFgLAHgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAGAGAEALQAFAJAAANIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgMADIgOABQgMABgKgFgAgUglQgJAJgCAQIBCAAQAAgGgDgIQgCgGgDgFQgGgFgEgCQgHgCgHAAQgOAAgJAJg");
	this.shape_141.setTransform(315.5,20.6);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAHACAFABQAGgBAEgCIAIgDQADgDABgEIACgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAIAEQAKADAHAIIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_142.setTransform(303.925,20.6);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#373535").s().p("AgaA7QgIgEgFgGQgEgFgEgJQgCgJgBgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_143.setTransform(292,20.675);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQABAAAAAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgLAKgJQAIgHANAAIAJABQAFACACACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAGgEANIAABMg");
	this.shape_144.setTransform(281.25,20.475);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_145.setTransform(272.775,17.9);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAAAAAQABAAABABQAAAAAAAAQABAAAAABIADADIAfBNIADARIAFgRIAfhNIADgDQAAgBABAAQAAAAAAAAQABgBABAAQAAAAABAAIAQAAIgxB5g");
	this.shape_146.setTransform(263.525,20.575);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQAAAAgBAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQAAAAABAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_147.setTransform(246.425,20.6);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGIgGAIQgCAJAAAEIAABMIgUAAIAAhMQAAgOgGgHQgFgIgMAAQgJAAgGAFQgFADgHAIIAABZIgVAAIAAh4IAMAAQAFAAABAEIACANQAHgIAIgFQAIgFALgBQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgDQAEgCAHgDIAMgBQAJAAAIAEQAIACAFAHQAEAEAEAJQACALAAAJIAABMg");
	this.shape_148.setTransform(230.475,20.5);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgHgIgEgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAFAHAGANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAEgNAAQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_149.setTransform(213.8,20.6);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAFABQAGgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgFgCQgBgCgJgDIgKgDQgHgCgFgDQgGgBgEgEQgEgDgDgGQgDgFAAgJQAAgFADgIQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgGgDIgHgEIgLgBQgFAAgEABIgHAFIgFAFQgCADAAAEQAAAFADADQADADAEACIAgAMIALAFQAEAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAGQgEAEgKAEQgJACgKAAQgNAAgKgDg");
	this.shape_150.setTransform(201.775,20.6);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#373535").s().p("AgZBRQgLgDgGgEQgHgEgDgGQgEgHAAgFQABgKAFgGQAGgGAKgEQgFgCgDgEQgDgEAAgHIAAgFIAEgFIAEgFIAHgFQgJgEgFgJQgFgKAAgJQAAgKADgHQAEgHAGgFQAHgGAHgCQAJgDAKAAQAIAAAGACQAHACAFADIAiAAIAAAIQAAAEgGABIgNACQADAHAAALQAAAIgCAIQgFAIgFAEQgGAFgJADQgIADgJAAQgKAAgGgCQgEACgCADQgBACAAADQAAAEADACQAEADAFABIAbABIAPABQAHABAGADQAGADADAGQADAFAAAJQAAAIgDAHQgFAIgGAFQgKAHgIACQgLAEgMAAQgNAAgKgDgAggAmQgEAFgBAGQAAAFADACQACAEAEADQAGADAFABQAGABAJAAQAIAAAHgBQAGgCAFgDQAFgDACgEQADgFAAgEQAAgEgDgDQgBgDgGgCIgKgCIgXgBQgHAAgFgBQgGACgFAGgAgWg9QgIAHAAALQAAAEACAGQACAEAEAEQAEAEAEABQAGACAFAAQAEAAAGgCQAEgBAFgEQAEgEABgEQABgEAAgGQAAgLgGgHQgHgGgMAAQgNAAgGAGg");
	this.shape_151.setTransform(186.05,22.675);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgOAAQgIABgIAEQgIAEgHAIIAABYIgWAAIAAh4IANAAQAFAAAAAEIACAOQAHgIALgGQAJgFANgBQAKAAAIAEQAHADAFAGQAEAGAEAIQADAKAAAJIAABMg");
	this.shape_152.setTransform(173.3,20.5);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_153.setTransform(163.425,17.9);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgHgIgDgLQgDgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAJgFANAAQAJAAAJAEQAIAEAGAGIAAhDIAVAAIAACvIgMAAQgFAAgBgEIgCgPQgHAKgLAFQgKAGgMAAQgKAAgJgEgAgWgGQgJALAAAWQAAANADAHQABAJAEAFQAEAGAGACQAFADAIAAQAKAAAHgFQAHgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgPAAgKANg");
	this.shape_154.setTransform(153.15,17.925);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgGgCgIQgDgHAAgMIAAhNIAWAAIAABNQgBANAHAIQAHAIANAAQAIAAAIgFQAIgEAHgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgIgDg");
	this.shape_155.setTransform(140.1,20.675);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_156.setTransform(130.475,17.825);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgJgEgLQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAIACAJAJIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgGADQgGACgGAIQgFAGgCAIQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHAKgMAFQgMAEgOAAQgKABgKgFg");
	this.shape_157.setTransform(122.025,20.6);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgIAEgIAIIAABYIgUAAIAAh4IAMAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAEAGAEAIQACAKABAJIAABMg");
	this.shape_158.setTransform(109.7,20.5);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_159.setTransform(99.825,17.9);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_160.setTransform(86.775,20.6);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGQgEAEgBAEQgDAHAAAGIAABMIgUAAIAAhMQAAgOgGgHQgFgIgMAAQgJAAgGAFQgFADgHAIIAABZIgVAAIAAh4IAMAAQAFAAABAEIACANQAHgIAIgFQAIgFALgBQAMAAAIAHQAHAGADAMQACgGAFgFQADgEAGgEQAEgCAHgDIAMgBQAJAAAIAEQAIACAFAHQAEAEAEAJQACALAAAJIAABMg");
	this.shape_161.setTransform(71.975,20.5);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAFABQAGgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgFgCQgBgCgJgDIgKgDQgHgCgFgDQgGgBgEgEQgEgDgDgGQgDgFAAgJQAAgFADgIQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgNgHQgFgBgGAAQgFAAgEABIgHAFIgFAFQgCADAAAEQAAAFADADQADADAEACIAgAMIALAFQAEAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAGQgEAEgKAEQgJACgKAAQgNAAgKgDg");
	this.shape_162.setTransform(56.625,20.6);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_163.setTransform(48.525,17.9);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgHAEgJAIIAABYIgVAAIAAh4IANAAQAEAAACAEIABAOQAHgIALgGQAJgFANgBQAKAAAIAEQAHADAFAGQAFAGADAIQADAKgBAJIAABMg");
	this.shape_164.setTransform(38.9,20.5);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgCACgEAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgDAFAAAFQABAFABADIAFAGQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_165.setTransform(25.8,20.575);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgIgFgCgFQgEgGAAgGQAAgJAGgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEABgBIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgJADgIQAEgIAGgEQAHgGAHgCQAJgDAKAAQAHAAAHACQAHACAFADIAhAAIAAAIQAAAEgFABIgOACQAEAIAAAKQAAAJgDAHQgDAHgHAFQgGAGgIACQgIADgJAAQgJAAgHgCQgDACgDADQgCABAAAEQAAAEADACQAGADADABIAcABQAIAAAHABQAGABAHADQAFADAEAGQADAFABAJQAAAHgFAIQgDAIgIAFQgJAHgJACQgKAEgNAAQgMAAgKgDgAghAmQgEAEAAAHQAAAEADADQAAADAGAEQAFADAGABQAGABAJAAQAIAAAGgBQAIgCAEgDQAEgCADgFQADgFAAgEQAAgEgDgDQgCgDgEgCIgLgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgGAHgBALQAAAGACAEQACAFADADQAEADAEACQAIACAEAAQADAAAIgCQAEgCAEgDQADgDABgFQACgEAAgGQAAgLgGgHQgHgGgMAAQgNAAgHAGg");
	this.shape_166.setTransform(13.9,22.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAGgLAKgJQAIgHAMAAIAJABQAFACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAgBAAIgFgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_167.setTransform(3.425,20.475);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#373535").s().p("AgXA6QgMgFgHgIQgIgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgGAIgMAFQgLAEgNAAQgNABgKgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAFQAEAGAHADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_168.setTransform(-8.7,20.6);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgJAFgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAIgGAHgCQAIgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAJgEAHQgEAIgFAEQgGAFgJADQgIADgJAAQgJAAgHgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgKgCIgYgBQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAHgCQAEgCAEgDQADgDACgFQACgGAAgEQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_169.setTransform(-26.025,22.675);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAFAAABAEIACAOQAGgIAMgGQAJgFAMgBQAKAAAHAEQAJAEAEAFQAEAGAEAIQACAKABAJIAABMg");
	this.shape_170.setTransform(-38.8,20.5);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_171.setTransform(-48.675,17.9);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAABAAQAAAAABABQAAAAABAAQAAAAABABIACADIAeBNIAEAJIAAAIIAFgRIAfhNIACgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAABAAIAQAAIgyB5g");
	this.shape_172.setTransform(-57.9,20.575);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgEgEIgEgEIgBgGIABgGIAEgFIAEgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_173.setTransform(-67.1,17.9);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_174.setTransform(-73.275,17.825);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_175.setTransform(-84.025,17.825);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_176.setTransform(-90.175,17.825);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_177.setTransform(-99.525,20.575);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgJAGgFQAFgGAGgDQAHgCAKAAQAKAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgKAAQgGAAgEABQgFACgCAEQgEADgCAFQgBAHAAAGIAAALIAjAAIAAAPIgjAAIAABng");
	this.shape_178.setTransform(-114,17.95);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgJgIgDgLQgEgLAAgPQAAgOAEgLQAEgMAIgIQAIgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAHAIAFAMQAEANAAAMQAAANgEANQgFAMgHAHQgHAJgLAEQgLAEgNAAQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_179.setTransform(-124.8,20.6);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgGAFgHADQgIACgIAAQgNABgIgJg");
	this.shape_180.setTransform(-140.625,18.7);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#373535").s().p("AAdA9IAAhMQAAgNgGgIQgGgIgOAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAIAAALIAABMg");
	this.shape_181.setTransform(-151.6,20.5);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgHgIgFgMQgEgMAAgPQAAgMADgMQAEgJAHgKQAIgHALgFQAKgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgPAAgIAJg");
	this.shape_182.setTransform(-164.75,20.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgHgIgLAAIgKACQgHADgBADIgGAIQgCAJAAAEIAABMIgVAAIAAhMQAAgNgFgIQgGgIgMAAQgIAAgHAFQgFADgHAIIAABZIgWAAIAAh4IAOAAQAEAAABAEIACANQAGgJAJgEQAIgFALgBQANAAAHAHQAHAHADALQADgGAEgFQAEgFAFgDQAFgDAGgCIAMgBQAJAAAIAEQAHACAGAHQAFAGACAHQAEAKAAAKIAABMg");
	this.shape_183.setTransform(-180.7,20.5);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEAKAAARQAAALgEAMQgDAMgHAJQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgIgFgFQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_184.setTransform(-196.825,22.55);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgJgIgDgLQgEgLAAgPQAAgOAEgLQAEgMAIgIQAHgIALgEQAKgFANAAQAOAAAKAFQALAEAHAIQAGAHAGANQAEANAAAMQAAANgEANQgFAMgHAHQgHAIgLAFQgKAEgOAAQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgLgBgWQABgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_185.setTransform(-210.6,20.6);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_186.setTransform(-220.375,17.825);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgDgNAAgOQAAgNADgLQAEgLAHgIQAHgHALgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAJAAANIgCAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgFAEgGACIgOADIgNABQgLABgLgFgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgFgCgIAAQgOAAgJAJg");
	this.shape_187.setTransform(-229.75,20.6);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAAAAAQABAAABABQAAAAAAAAQABAAAAABIADADIAfBNIADARIAFgRIAfhNIACgDIAEgCIARAAIgxB5g");
	this.shape_188.setTransform(-241.825,20.575);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgEgMgBgPQAAgMAFgMQADgJAIgKQAGgHAMgFQAKgFANAAQALAAAJAEQAJAEAHAHQAGAGAEALQADAJAAANQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhRAAQACAMACAIQACAHAGAHQAFAGAGADQAJACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgFAEgHACIgNADIgNABQgMABgLgFgAgTglQgJAJgCAQIBBAAQgBgJgBgFQgDgGgEgFQgDgEgGgDQgGgCgHAAQgOAAgJAJg");
	this.shape_189.setTransform(-254,20.6);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgJAGgNAAQgJAAgKgEgAgVgGQgKAKAAAXQAAAJACALQACAJAEAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_190.setTransform(-267.425,17.925);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgKALAAAWQAAALADAJQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_191.setTransform(-285.475,17.925);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#373535").s().p("AAeA9IAAhMQgBgOgGgHQgGgIgNAAQgIABgJAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAGAAAAAEIABAOQAIgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQACAIAAALIAABMg");
	this.shape_192.setTransform(-298.25,20.5);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_193.setTransform(-311.325,20.575);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_194.setTransform(-328.375,20.5);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEAMAAANQAAAOgEAMQgEALgIAIQgHAJgLAEQgLAEgNAAQgMABgLgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAFQAEAGAHADQAHADAIAAQASAAAJgMQAIgMAAgVQAAgUgIgNQgJgMgSAAQgIAAgHADg");
	this.shape_195.setTransform(-341.85,20.6);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_196.setTransform(-351.575,17.9);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIACgIAAQgOABgHgJg");
	this.shape_197.setTransform(-359.175,18.7);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEIgMgBQgIAAgGADQgGACgGAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgHALgNAEQgLAEgOAAQgKABgKgFg");
	this.shape_198.setTransform(-369.025,20.6);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgJAFgGAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAIAEQAHADAFAGQAFAGADAIQADAKAAAJIAABMg");
	this.shape_199.setTransform(-381.375,20.5);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#373535").s().p("AgbA7QgIgEgFgGQgFgHgCgHQgDgJABgKIAAhNIAVAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_200.setTransform(-395,20.675);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgIAGgGQAFgGAGgDQAHgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgJAAQgGAAgEABQgFACgDAEQgDACgDAGQgBAGAAAHIAAALIAjAAIAAAPIgjAAIAABng");
	this.shape_201.setTransform(-405.5,17.95);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQAAAAABAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgFQgEgFgFgCQgHgCgGAAQgPAAgJAJg");
	this.shape_202.setTransform(-420.575,20.6);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAIgIAJgFQAKgFALAAQAKAAAHADQAJAFAEAFQAFAFADAJQACAIAAAKIAABNg");
	this.shape_203.setTransform(-433.35,17.825);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIACgIAAQgOABgHgJg");
	this.shape_204.setTransform(-444.675,18.7);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAEgIAIIAABYIgVAAIAAh4IANAAQAEAAACAEIABAOQAIgJAKgFQAJgFANgBQAKAAAIAEQAHADAFAGQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_205.setTransform(443.55,-8.3);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADQACADABACIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_206.setTransform(433.675,-10.9);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgDgLgBgQQABgMADgNQADgKAIgJQAGgJAKgEQAKgFAMAAQAKAAAIAEQAHADAIAHIAAhDIAUAAIAACvIgMAAQgEAAgCgEIgBgPQgJAKgJAFQgKAGgNAAQgJAAgKgEgAgVgGQgJAKAAAXQAAAJACALQABAJAEAFQAFAGAGACQAEADAIAAQAKAAAIgFQAIgFAHgIIAAg6QgGgIgIgDQgHgEgIAAQgQAAgJANg");
	this.shape_207.setTransform(418.75,-10.875);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgJgJgDgLQgFgMABgPQAAgMADgMQAEgJAHgKQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgOAAgKAJg");
	this.shape_208.setTransform(406.2,-8.2);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBIAFACIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgHAFQgDACgCADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_209.setTransform(394.625,-8.2);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#373535").s().p("AgaA7QgIgEgFgGQgFgGgDgIQgDgIAAgLIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAIAAAJgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_210.setTransform(382.725,-8.125);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#373535").s().p("AgZA7QgIgEgJgHIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgCgDQgDgDgFgCIgKgFIgWgIIgKgFQgEgDgDgGQgDgFAAgJQAAgHADgGQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEIgKgBQgFAAgEABIgHAFQgEACgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgFAFgJAEQgJACgKAAQgNAAgKgDg");
	this.shape_211.setTransform(366.225,-8.2);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_212.setTransform(354.625,-8.3);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEAMAAANQAAAOgEAMQgEALgIAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAHACAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_213.setTransform(341.15,-8.2);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_214.setTransform(331.425,-10.9);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_215.setTransform(323.825,-10.1);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAIACAJAJIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgGADQgGACgGAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHAKgMAFQgMAFgOgBQgKABgKgFg");
	this.shape_216.setTransform(313.975,-8.2);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#373535").s().p("AgaA7QgJgEgFgGQgFgHgCgHQgCgHgBgMIAAhNIAVAAIAABNQAAANAHAIQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgHgDg");
	this.shape_217.setTransform(301.35,-8.125);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAGgMAJgIQAKgHALAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgEAMIAABMg");
	this.shape_218.setTransform(290.6,-8.325);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAEgCIAEgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_219.setTransform(280.675,-10.1);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAHACAFABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgFAFgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_220.setTransform(270.875,-8.2);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAKAAAJIAABMg");
	this.shape_221.setTransform(259.25,-8.3);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_222.setTransform(249.375,-10.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgFAFgCAJQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_223.setTransform(236.275,-8.2);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_224.setTransform(227.375,-10.9);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgHAHgGACQgIACgIAAQgOABgHgJg");
	this.shape_225.setTransform(219.825,-10.1);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#373535").s().p("AgSA6QgJgDgJgKQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQAMgFALAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgFQgEgFgFgCQgHgCgGAAQgPAAgJAJg");
	this.shape_226.setTransform(209.025,-8.2);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAKAAAJIAABMg");
	this.shape_227.setTransform(196.25,-8.3);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgIgJgEgLQgFgMABgPQAAgMADgMQAEgJAHgKQAIgHALgFQAKgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgHgCgGAAQgPAAgIAJg");
	this.shape_228.setTransform(183.1,-8.2);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgIgFgCgFQgEgGAAgGQAAgJAGgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEABgBIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgKAEgHQADgHAGgFQAHgGAHgCQAJgDAKAAQAHAAAHACQAHACAFADIAhAAIAAAIQABAEgGABIgNACQADAIAAAKQABAJgEAHQgDAHgGAFQgHAGgIACQgJADgIAAQgKAAgGgCQgDACgDADQgCABAAAEQAAAEADACQAFADAFABIAbABIAPABQAGABAHADQAGAEADAFQAEAFAAAJQAAAIgFAHQgDAIgHAFQgKAHgJACQgKAEgNAAQgMAAgKgDgAghAmQgEAEAAAHQAAAEADADQABADAFAEQAEACAHACQAGABAJAAQAIAAAGgBQAIgCAEgDQADgCAEgFQADgFAAgEQAAgEgDgDQgCgDgFgCIgKgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgHAHAAALQAAAGACAEQACAFADADQAEADAEACQAHACAFAAQADAAAIgCIAIgFIAFgIQABgEAAgGQAAgLgHgHQgGgGgMAAQgNAAgHAGg");
	this.shape_229.setTransform(170.85,-6.125);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#373535").s().p("AgZA7QgIgEgJgHIAFgIIACgDIAEgBIAEACIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgCgDQgDgDgFgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgHAFQgEACgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_230.setTransform(154.625,-8.2);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_231.setTransform(143.025,-8.3);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_232.setTransform(133.175,-10.9);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgHAAgHQAAgHAEgHQAEgHAJgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgHgHQgFgHgMAAQgIAAgEACIgJAEIgIAEQgCACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBgBgDIgCgLIgJAHIgKAGIgJAEIgNABQgIAAgFgCgAABAIIgPAFQgGADgEAEQgCAFAAAFQgBAFACADQABAEADACQADACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgLABg");
	this.shape_233.setTransform(123.8,-8.225);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgOAAIgEgBIgBgEIAAgIIATgCIAGgmIABgDQAAAAABgBQAAAAABAAQAAAAABAAQAAgBAAAAIALAAIAAArIAiAAIAAAPIgiAAIAABIQAAAIADAEQAEADAFAAIAHgBIADgCIAEgBIACgBQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgNABgJgJg");
	this.shape_234.setTransform(113.4,-10.1);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#373535").s().p("AAdA9IAAhMQABgOgHgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAEAAACAEIACAOQAGgIAMgGQAJgFAMgBQAKAAAHAEQAJAEAFAFQAFAIACAGQACAIABALIAABMg");
	this.shape_235.setTransform(102.4,-8.3);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#373535").s().p("AgWA6QgLgEgIgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIALgEQAJgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEALAAAOQAAAPgEALQgEALgHAIQgIAJgKAEQgMAFgNgBQgMABgKgFgAgPgqQgGAEgFAFQgEAGgDAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAIACAHAAQATAAAIgMQAJgMAAgVQAAgUgJgNQgIgMgTAAQgHAAgIADg");
	this.shape_236.setTransform(88.9,-8.2);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_237.setTransform(76.875,-8.2);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAIADgCIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_238.setTransform(61.925,-10.1);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAJgFAOgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgFACIgJAEIgHAEQgCACgDAAIgEgBIgCgDIgEgGQAKgKALgFQAMgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgDgLIgJAHQgEAEgGACIgKAEIgMABQgHAAgGgCgAABAIQgJADgGACQgGADgEAEQgDAFAAAFQABAFABADQACAEADACQACACADABIAIABIAKgBIAJgDIAPgMIAAgZQgPAAgLABg");
	this.shape_239.setTransform(51.2,-8.225);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgHAKgGQAKgFALAAQAKAAAHADQAJAEAEAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_240.setTransform(38.775,-10.975);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_241.setTransform(27.475,-10.1);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgNAAgOQAAgNAEgMQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgHAKgLAFQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAHgEAHgJIAAg6QgGgIgHgDQgIgEgHAAQgQAAgJANg");
	this.shape_242.setTransform(11.175,-10.875);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_243.setTransform(1.875,-10.9);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQANAAAKAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgFAFgCAJQgCAHAAALQAAALACAIQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_244.setTransform(-6.575,-8.2);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_245.setTransform(-18.675,-8.225);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgFAGgCAIQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_246.setTransform(-34.575,-8.2);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_247.setTransform(-43.475,-10.9);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_248.setTransform(-52.875,-8.2);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_249.setTransform(-62.2,-10.975);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgHAKIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKADAFQAGAGAGADQAFADAIAAQAGAAAHgCIAJgEIAFgFQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABABQABAAAAAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_250.setTransform(-70.675,-8.2);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#373535").s().p("AgaA7QgJgFgEgFQgFgFgDgJQgDgJAAgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAHgEAIgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgJAKgJAFQgJAFgMAAQgKAAgHgDg");
	this.shape_251.setTransform(-83.3,-8.125);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIABAOQAIgIAKgGQAKgFAMgBQAKAAAIAEQAIAEAEAFQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_252.setTransform(-96.35,-8.3);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_253.setTransform(-114.075,-8.225);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgIAFQgDACgBADQgCADAAAEQAAAEADAEIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_254.setTransform(-129.925,-8.2);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_255.setTransform(-138.075,-10.9);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#373535").s().p("AgTBpIgCgCIgBgDIABgCIABgCQAMgXAHgXQAFgaAAgYQAAgagFgXQgGgXgNgXIgCgEIABgDIACgCIAKgGQAIAOAGAOQAHAPADAMQAEAPACANQACAMAAAPQAAAQgCANQgCALgEAQQgDAMgHAPQgGAOgIAOg");
	this.shape_256.setTransform(-149.825,-9.675);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgDgBAAgDIgQgpIhNAAIgQApIgDAEQgBACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgghVg");
	this.shape_257.setTransform(-161.125,-10.725);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABCFIgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_258.setTransform(-178.375,-10.725);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_259.setTransform(-195.975,-10.725);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#373535").s().p("AgEBTQgHgPgDgMIgGgbQgCgOAAgPQAAgOACgNQACgOAEgOQADgMAHgPQAGgOAIgOIAKAGIACACIABADIgCAEQgMAXgHAXQgFAXAAAaQAAAbAFAXQAHAXAMAXIABACIABACIgBADIgCACIgKAGQgIgOgGgOg");
	this.shape_260.setTransform(-208.825,-9.675);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgDgLgBgQQAAgOAEgLQAEgKAGgJQAHgJAKgEQAKgFAMAAQAKAAAIAEQAHADAIAHIAAhDIAUAAIAACvIgMAAQgEAAgCgEIgCgPQgIAKgKAFQgKAGgLAAQgKAAgKgEgAgVgGQgKALABAWQAAANABAHQACAJAFAFQADAGAHACQAEADAIAAQAKAAAIgFQAIgFAHgIIAAg6QgGgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_261.setTransform(-224.55,-10.875);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADQACADABACIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_262.setTransform(-233.825,-10.9);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgFAIIgCACIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKAEAFQAEAGAHADQAFADAIAAQAGAAAHgCIAJgEIAFgFIAEgBQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_263.setTransform(-242.325,-8.2);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgKAEIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgBgBgBgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAFACADQABAEACACQACACAFABIAIABIAJgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_264.setTransform(-254.4,-8.225);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgHAKIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKADAFQAFAGAHADQAFADAIAAQAGAAAHgCIAIgEIAGgFQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_265.setTransform(-270.325,-8.2);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_266.setTransform(-279.175,-10.9);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgFgMABgPQAAgNADgLQAEgLAHgIQAIgHAKgFQALgFAMAAQALAAAJAEQAKAEAGAHQAHAGAEALQAEAJAAANIgBAHQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgEAEgIACIgMADIgOABQgLABgLgFgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgFQgGgFgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_267.setTransform(-288.6,-8.2);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_268.setTransform(-297.925,-10.975);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_269.setTransform(-306.375,-8.2);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#373535").s().p("AgaA7QgJgEgEgGQgFgGgDgIQgDgIAAgLIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAJAAAIgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_270.setTransform(-319.025,-8.125);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_271.setTransform(-332.075,-8.3);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAPAAAJAFQAKAEAIAIQAHAIAFAMQAEANAAAMQAAANgEANQgEALgIAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAHACAIAAQASAAAJgMQAJgLAAgWQAAgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_272.setTransform(-345.55,-8.2);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#373535").s().p("AgSBVQgHgEgHgJIgBALQgBAEgFAAIgNAAIAAivIAVAAIAABIQAIgJAJgFQAJgFAMAAQAMAAAIAEQAHAEAHAIQAFAHAEAMQADALABAPQAAAOgEALQgEALgGAJQgHAJgKAEQgKAFgMAAQgKAAgJgEgAgRgNQgJAGgFAHIAAA6QAGAIAGADQAHAEAJAAQAQAAAJgNQAKgMgBgWQAAgNgBgHQgDgIgEgFQgEgGgGgCQgEgDgIAAQgJAAgJAFg");
	this.shape_273.setTransform(-358.45,-10.875);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_274.setTransform(-368.725,-10.9);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAHgMAIgIQAJgHAMAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgJAHgDAMIAABMg");
	this.shape_275.setTransform(-376,-8.325);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#373535").s().p("AgfBRIAXgwIgzhyIATAAQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIADADIAgBMIACAKIAEgKIAfhMIADgDIAEgCIARAAIhDCdIgDAEQgBACgEgBg");
	this.shape_276.setTransform(-387.625,-6.15);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#373535").s().p("AAkA9IgDgBIgDgDIgegwIgCAGIgcAqIgDADIgEABIgTAAIArg9Igqg8IAVAAIAEABIACADIAdAtIADgGIAagnIADgDIACgBIAUAAIgoA7IAqA+g");
	this.shape_277.setTransform(-399.8,-8.225);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgNAFgHQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAGAHAFANQAEANAAAMQAAANgEANQgFAMgGAHQgIAJgLAEQgLAFgNgBQgNABgKgFgAgPgqQgGAEgFAFQgEAFgDAJQgCALAAAIQAAAJACAKQADAKAEAEQAFAGAGAEQAHACAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_278.setTransform(-411.8,-8.2);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgMAAgPQABgMAEgMQAEgLAGgIQAIgHAKgFQALgFAMAAQALAAAKAEQAJAEAHAHQAGAGAEALQAEAJgBANQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAJACALQADAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgGAEQgEAEgHACIgOADIgMABQgLABgMgFgAgUglQgJAJgBAQIBAAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgGgCgGAAQgOAAgKAJg");
	this.shape_279.setTransform(-424.8,-8.2);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_280.setTransform(-439.575,-10.725);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#373535").s().p("AgFAOIgFgEIgDgEIgBgGIABgFIADgEIAFgEIAFgBIAFABIAGAEQACABAAADIACAFIgCAGQAAADgCABIgGAEIgFABg");
	this.shape_281.setTransform(-116,-43.25);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAgBgBQAAAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgDAEQgCACgCAAIgSAAIBEirIAXAAIBFCrgAgfAWIA/AAIgbhFQgDgFgCgLg");
	this.shape_282.setTransform(-126.7,-50.525);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABAGIAAB/IgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_283.setTransform(-143.975,-50.525);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#373535").s().p("AArBWQgGAAgDgFIgsg9IgFgFIgHgBIgSAAIAABIIgWAAIAAirIAwAAQAQAAALADQAMAEAIAGQAIAHAEAIQADAIAAAMQAAAJgDAIQgDAJgFAFQgFAGgJAEQgHAEgLACQAFADADAFIAzBEgAgogCIAZAAQAJAAAIgCQAIgCAFgFQAFgFACgGQADgGABgIQAAgPgLgIQgKgIgTAAIgaAAg");
	this.shape_284.setTransform(-159.8,-50.525);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgGgIgEgLQgDgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAVAAIAACvIgNAAQgDAAgCgEIgCgPQgHAKgLAFQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAEAFQAEAGAGACQAFADAIAAQAKAAAIgFQAGgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgQAAgIANg");
	this.shape_285.setTransform(-180.3,-50.675);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgIABgJAEQgJAFgGAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAFAFADAJQADAJAAAKIAABNg");
	this.shape_286.setTransform(-193.075,-48.1);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgJAEIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFANAAQALAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQgBAFACADQABAEADACQADACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgKABg");
	this.shape_287.setTransform(-206.15,-48.025);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgCAEQgCACgEAAIgSAAIBFirIAXAAIBFCrgAgCg2IgdBMIA/AAIgghVg");
	this.shape_288.setTransform(-224.825,-50.525);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABAGIAAB/IgVAAIAAirIAMAAIAFABIADADIBjCBIgBiFIAVAAIAACrg");
	this.shape_289.setTransform(-242.075,-50.525);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_290.setTransform(-259.675,-50.525);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#373535").s().p("AgLBIQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIABgEIAIgJIADgGIABgHIgBAAIgFgBIgFgEIgCgEIgBgGIABgFIACgFIAFgCIAFgBIAGABIAFADIADAGIABAHQgBAFgBAGQgCAGgDAFQgBAFgGAGIgIAKgAgFgtIgFgEIgDgFIgBgGIABgFIADgFIAFgDIAFgBIAGABIAEADQADABABAEIABAFIgBAGQgBADgDACIgEAEIgGABg");
	this.shape_291.setTransform(-276.85,-46.2);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_292.setTransform(-282.975,-50.775);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQADgGAJgGQAKgFAOgDQAPgDATAAIAAgKQAAgNgGgIQgGgHgMAAQgIAAgFACIgJAEIgGAEQgCACgEAAIgDgBIgEgDIgDgGQAKgKALgFQAMgFANAAQALAAAHAEQAIACAGAHQAFAFADAKQADAIAAAKIAABNIgPgBQgCgCgBgCIgBgLIgKAHIgJAGIgLAEIgMABQgIAAgFgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADQABAEADACQADACAEABIAIABIAJgBIAJgDIAPgMIAAgZQgPAAgKABg");
	this.shape_293.setTransform(-292.3,-48.025);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_294.setTransform(-301.275,-50.7);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAHgMAJgIQAIgHAMAAIAJABQAFACADACIgDAQQAAAAAAABQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_295.setTransform(-308.575,-48.125);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgMQgEgNAAgOQAAgOAEgLQAFgLAHgIQAGgIAMgEQAKgEAMgBQAMABAJADQAJAEAGAHQAHAGAEALQADAJABANIgBAIQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgEIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDADgGAFQgGAEgHACIgMAEIgOABQgMgBgKgEgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgDgGgDgEQgFgFgFgDQgHgCgHAAQgOAAgIAJg");
	this.shape_296.setTransform(-320.35,-48);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAQAFAAABgBIAFgBIADgCIACgCQAAAAAAABQABAAAAAAQABAAAAABQAAAAABABIAGAKQgHAFgGADQgIADgIAAQgOAAgIgJg");
	this.shape_297.setTransform(-331.075,-49.9);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQAKgFAPAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHQgEAEgGACQgDACgGACIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_298.setTransform(-341.825,-48.025);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#373535").s().p("AA9A+IAAhNQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGQgEADgBAGQgDAGAAAGIAABNIgUAAIAAhNQAAgOgGgHQgFgIgMAAQgJAAgGAEQgFAEgHAIIAABaIgVAAIAAh5IAMAAQAFAAABAFIACAMQAHgIAIgFQAIgGALAAQAMABAIAGQAHAGADANQACgHAFgFQADgDAGgEQAEgDAHgDIAMgBQAJAAAIADQAIAEAFAFQAEAFAEAJQACAKAAAKIAABNg");
	this.shape_299.setTransform(-357.425,-48.1);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgIgIgDgMQgEgKAAgQQAAgOADgKQAEgLAHgJQAIgJAKgEQALgEANgBQAOAAAIAFQAKAEAIAHIgGAIIgCACIgDAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIgGgEIgIgDQgEgBgHAAQgJAAgGADQgGADgFAGQgFAIgCAHQgDAJAAAJQAAALADAIQACAJAFAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQAAAAABAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgIAKgMAEQgMAEgNABQgKgBgKgEg");
	this.shape_300.setTransform(-377.425,-48);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAIAGACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_301.setTransform(-386.325,-50.7);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgOAAIgEgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmIABgDQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAKAAIAAAqIAiAAIAAAPIgiAAIAABIQAAAIADAEQAEADAGAAQAEAAACgBIAEgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIADgIAAQgNAAgIgJg");
	this.shape_302.setTransform(-393.925,-49.9);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgHgIgFgLQgFgNABgOQAAgMADgNQAEgJAHgKQAIgIAKgEQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgBACQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAIQAGAFAHADQAIADAGgBQAJABAFgCIAKgFQAEgBADgDIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDAEgHAEQgFAEgGACIgNAEIgOABQgLgBgKgEgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgEQgFgFgFgDQgGgCgHAAQgOAAgKAJg");
	this.shape_303.setTransform(-404.7,-48);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgGgHgOgBQgHABgJAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHADQAIAEAFAGQAEAFAEAJQADAJAAAKIAABNg");
	this.shape_304.setTransform(-417.45,-48.1);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgMQgEgNAAgOQAAgOAEgLQAFgLAHgIQAGgIAMgEQAKgEAMgBQAMABAJADQAJAEAGAHQAGAFAFAMQADAJABANIgBAIQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgEIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDADgGAFQgGAEgHACIgMAEIgOABQgMgBgKgEgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgDgGgDgEQgFgFgFgDQgHgCgHAAQgOAAgIAJg");
	this.shape_305.setTransform(-430.6,-48);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgJAFgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAIgGAHgCQAIgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAJgEAHQgEAIgFAEQgGAFgJADQgIADgJAAQgJAAgHgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgKgCIgYgBQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAHgCQAEgCAEgDQADgDACgFQACgEAAgGQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_306.setTransform(-442.875,-45.925);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgDQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgHAGgHQAFgGAGgDQAHgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgJAAQgGAAgEACQgFABgDADQgDADgDAGQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_307.setTransform(404.4,-79.45);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#373535").s().p("AgXA6QgKgEgJgJQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgOAFgGQAKgJAJgDQAJgFAOAAQAOAAAKAFQALADAHAJQAHAGAFAOQAEANAAAMQAAANgEANQgFAMgHAHQgHAJgLAEQgLAEgNAAQgNAAgKgEgAgPgqQgGADgFAGQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_308.setTransform(393.6,-76.8);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgBgGgEQgFgBgFgEQgFgEgCgFQgDgGAAgIQAAgGADgHQADgIAFgDQAFgFAJgDQAHgCAKgBQANABAJADQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgHAAQgEAAgEABIgIAEQgDADgBADQgCADAAAEQAAAFADADIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_309.setTransform(376.975,-76.8);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#373535").s().p("AgZBVQgKgEgFgIQgGgHgEgMQgCgLAAgQQgBgOAEgLQAEgKAGgJQAIgJAJgEQAJgFANAAQAJAAAJAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgKAGgLAAQgLAAgIgEgAgWgGQgJALAAAWQAAANACAHQACAJAEAFQAEAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgGgIgGgDQgJgEgIAAQgPAAgKANg");
	this.shape_310.setTransform(364.7,-79.475);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIABANQAHgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAEAFAEAJQACAJAAAKIAABNg");
	this.shape_311.setTransform(351.95,-76.9);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCIAGACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_312.setTransform(342.075,-79.5);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#373535").s().p("AAhBYQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAgBIgngyIgEgDIgFgBIgGAAIAAA6IgWAAIAAivIAWAAIAABnIAFAAIAEgBIAEgDIAlgoIAEgDQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAIAUAAIgwAyIgDADIADADIADAEIAwA8g");
	this.shape_313.setTransform(333.425,-79.575);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#373535").s().p("AgLBJQgIgIAAgOIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAJAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAHAEAFQAEADAGAAIAFgBIAFgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgGAGgHACQgIACgIAAQgOABgHgJg");
	this.shape_314.setTransform(317.275,-78.7);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgIAIIAABZIgVAAIAAh5IANAAQAEAAACAFIABANQAIgJAKgFQAJgGANAAQAKAAAIADQAHAEAFAGQAEAFAEAJQACAJAAAKIAABNg");
	this.shape_315.setTransform(306.3,-76.9);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgOADgLQAEgLAHgIQAHgIALgEQALgEAMgBQALABAJADQAKAEAGAHQAHAGAEALQADAJAAANIgBAIQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgHACIgOAEIgNAAQgLAAgLgEgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgCgGgDgEQgFgGgGgCQgGgCgHAAQgOAAgJAJg");
	this.shape_316.setTransform(293.15,-76.8);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIACATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgFAMIAABMg");
	this.shape_317.setTransform(282.7,-76.925);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgLQgFgNAAgOQABgMAEgNQAEgLAGgIQAIgIAKgEQALgEAMgBQALABAJADQAKAEAHAHQAGAGAEALQAEAJgBANQAAAGgBACQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAJACALQADAHAFAIQAGAFAGADQAJADAGgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgGAEQgEAEgHACIgOAEIgMAAQgLAAgMgEgAgUglQgJAJgBAQIBAAAQAAgJgCgFQgBgGgFgEQgDgFgHgDQgGgCgGAAQgOAAgKAJg");
	this.shape_318.setTransform(270.9,-76.8);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgEgDQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgIAFgGQAGgGAHgDQAGgCALAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFACQgFABgDADQgDAEgCAFQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_319.setTransform(260.7,-79.45);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgDQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgHAFgHQAGgGAHgDQAGgCALAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgEACQgFABgDADQgDADgDAGQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_320.setTransform(252.6,-79.45);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgCACAAIAGACIAFADQACACABADIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_321.setTransform(245.425,-79.5);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgFgHgEgMQgEgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAKgFAMAAQAJAAAJAEQAIADAGAHIAAhDIAVAAIAACvIgMAAQgEAAgCgEIgCgPQgHAKgKAFQgLAGgMAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAHgFQAJgFAGgIIAAg6QgFgIgIgDQgIgEgIAAQgQAAgIANg");
	this.shape_322.setTransform(235.15,-79.475);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgHgEgMQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_323.setTransform(217.6,-76.8);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#373535").s().p("AAiA9QgEAAAAgEIgehdIgCAMIgbBRQgBAEgEAAIgQAAIgnh5IAQAAQABAAABAAQAAAAABABQAAAAABAAQAAAAABABIACADIAZBVIABAJIAfhfIACgDIAEgBIAIAAIAEABIACADIAcBWIABAIIAchdIACgDQABgBAAAAQAAAAABAAQAAgBABAAQABAAAAAAIAQAAIgnB5g");
	this.shape_324.setTransform(201.775,-76.825);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgBIADgCIACgCQAAAAABABQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgHAGgGACQgIACgIAAQgOABgHgJg");
	this.shape_325.setTransform(188.075,-78.7);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgOADgLQAEgLAHgIQAIgIAKgEQALgEAMgBQALABAJADQAKAEAGAHQAHAGAEALQAEAJAAANIgCAIQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgIACIgMAEIgOAAQgLAAgLgEgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgEQgGgGgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_326.setTransform(172.65,-76.8);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABAAAAABIABATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgMAAgGAHQgHAGgFANIAABMg");
	this.shape_327.setTransform(162.2,-76.925);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgDACgCAAIgFgBIgCgDIgEgGQALgLALgEQAKgFAPAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGAEgEADQgDAFABAFQgBAFACADQACAEADACQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_328.setTransform(150.45,-76.825);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgLQgFgNABgOQAAgOADgLQAFgLAGgIQAIgIALgEQAKgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBACQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgFAEQgGAEgGACIgNAEIgOAAQgLAAgLgEgAgTglQgKAJgCAQIBCAAQAAgGgDgIQgCgGgDgEQgGgGgEgCQgHgCgHAAQgOAAgIAJg");
	this.shape_329.setTransform(133.6,-76.8);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABAAAAABIABATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgIAHgFAMIAABMg");
	this.shape_330.setTransform(123.15,-76.925);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgMADgNQAEgLAHgIQAIgIAKgEQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgCACQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhRAAQABAMACAIQADAHAFAIQAGAFAGADQAJADAGgBQAIABAGgCIAKgFQAFgBACgCIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDAEgHAEQgFAEgGACIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgEQgDgFgHgDQgFgCgHAAQgOAAgKAJg");
	this.shape_331.setTransform(111.35,-76.8);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgIAKgFQAJgFAMAAQAKAAAHADQAIAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_332.setTransform(98.575,-79.575);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#373535").s().p("AgLBWIAAiXIg3AAIAAgUICFAAIAAAUIg3AAIAACXg");
	this.shape_333.setTransform(84.675,-79.325);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#373535").s().p("AgFAOIgFgDIgDgFIgBgGIABgFIADgEIAFgEIAFgBIAGABIAEAEQACABACADIABAFIgBAGQgBADgDACIgEADIgGABg");
	this.shape_334.setTransform(70.45,-72.05);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgDgBIgDgDIgEgGQAMgLAKgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAEACAEQABAEACACIAGADIAIABIAKgBIAIgDIAJgGIAHgGIAAgZQgPAAgKABg");
	this.shape_335.setTransform(61.6,-76.825);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCIAGACIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_336.setTransform(52.675,-79.5);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAHgMAJgIQAJgHALAAIAKABIAHAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgHAGgFANIAABMg");
	this.shape_337.setTransform(45.35,-76.925);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#373535").s().p("AgZBVQgKgFgFgHQgGgHgDgMQgEgLABgQQgBgOAEgLQAEgKAGgJQAIgJAJgEQAJgFANAAQAKAAAIAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgHAKgLAFQgJAGgMAAQgLAAgIgEgAgWgGQgIALgBAWQAAAJACALQADAJADAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgHgDQgJgEgHAAQgQAAgKANg");
	this.shape_338.setTransform(32.7,-79.475);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#373535").s().p("AAdA+IAAhNQABgNgHgIQgGgHgOgBQgHABgJAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHADQAJAFAEAFQAEAFAEAJQADAJAAAKIAABNg");
	this.shape_339.setTransform(19.95,-76.9);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgHgEgMQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAIACAHAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_340.setTransform(6.45,-76.8);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#373535").s().p("AAeBYIAAhNQAAgNgHgHQgGgIgNAAQgIAAgJAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAHgHAKgGQAKgFALAAQAKAAAHADQAJAEAFAGQAEAGADAIQACAHAAALIAABNg");
	this.shape_341.setTransform(-6.75,-79.575);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgKAAgQQAAgOADgKQAEgLAHgJQAIgJAKgEQALgEANgBQAOAAAIAFQAKAEAIAHIgGAIIgCACIgDABIgDgCIgGgEIgIgDQgEgBgHAAQgJAAgGADQgGADgFAGQgFAIgCAHQgCAIAAAKQAAAMACAHQACAJAFAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgEIAEgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgIAKgMAEQgMAEgNAAQgKAAgKgEg");
	this.shape_342.setTransform(-18.925,-76.8);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQADgMAIgIQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEAKAAAPQAAAQgEAKQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAHAAALQAAALACAIQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_343.setTransform(-31.45,-76.8);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgBIADgCIACgCQAAAAABABQAAAAAAAAQABAAAAABQAAAAABABIAGAKQgHAGgGACQgIACgIAAQgOABgIgJg");
	this.shape_344.setTransform(-42.575,-78.7);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_345.setTransform(-50.125,-79.5);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#373535").s().p("AA9A+IAAhNQAAgPgGgGQgHgIgMAAQgFABgFABIgIAGIgFAJQgCAFAAAHIAABNIgVAAIAAhNQAAgOgGgHQgFgIgMAAQgJABgGADQgHAGgFAGIAABaIgWAAIAAh5IAOAAQAEAAABAFIACAMQAHgIAHgFQAJgGALAAQANABAHAGQAHAHADAMQABgFAGgHQAFgFAEgCQAFgEAGgCIAMgBQAJAAAIADQAHAEAFAFQAFAFADAKQADAIABALIAABNg");
	this.shape_346.setTransform(-62.9,-76.9);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#373535").s().p("AgSA6QgKgDgJgKQgHgIgFgLQgDgNAAgOQgBgOAEgLQAFgMAGgHQAIgIAKgEQALgEAMgBQALABAJADQAJADAHAIQAGAGAEALQAEAKABAMIgCAIQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgIACIgMAEIgOAAQgMAAgKgEgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgEQgGgGgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_347.setTransform(-83.85,-76.8);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#373535").s().p("AAeBYIAAhNQAAgMgHgIQgGgIgNAAQgIAAgJAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAHgHAKgGQAKgFALAAQAKAAAIADQAIAEAEAGQAGAHACAHQACAHAAALIAABNg");
	this.shape_348.setTransform(-96.65,-79.575);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgBIADgCIACgCQAAAAABABQAAAAAAAAQABAAAAABQAAAAABABIAGAKQgHAGgGACQgIACgIAAQgOABgIgJg");
	this.shape_349.setTransform(-107.925,-78.7);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgNAAgOQAAgNAEgMQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgGgIgHgDQgIgEgHAAQgQAAgJANg");
	this.shape_350.setTransform(-124.225,-79.475);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgJABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHADQAIAEAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_351.setTransform(-136.975,-76.9);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHACAGAHQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgTANIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_352.setTransform(-150.075,-76.825);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgIAFgDQAFgFAJgDQAHgCAKgBQANABAJADQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgGAAQgFAAgEABIgIAEQgDADgBADQgCADAAAEQAAAEADAEIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgGAEgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_353.setTransform(-165.925,-76.8);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#373535").s().p("AgbA7QgHgEgFgGQgFgFgDgJQgDgJAAgKIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAJAAAIgFQAJgFAGgHIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgJAAgJgDg");
	this.shape_354.setTransform(-177.825,-76.725);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgLQgFgNAAgOQAAgMAEgNQAEgKAIgJQAGgHALgFQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAFgCADQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQABAMADAIQADAJAFAGQAFAFAHADQAHADAHgBQAJABAFgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgGAEQgFAEgGACIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgEQgEgFgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_355.setTransform(-190.675,-76.8);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_356.setTransform(-200.025,-79.575);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgHgJgEgLQgEgLAAgPQAAgMAEgMQAEgMAHgIQAIgJAKgEQAKgEANgBQAOAAAJAFQAKAEAHAHIgGAIIgCACIgCABIgEgCIgFgEIgIgDQgFgBgHAAQgIAAgGADQgHADgFAGQgFAIgCAHQgCAJAAAJQAAAKACAJQAEALADAEQAFAGAHADQAFADAIAAQAGAAAHgCIAIgEIAGgEIAEgCQABAAABAAQAAAAABAAQABABAAAAQAAABAAAAIAGAIQgIAKgLAEQgMAEgNAAQgLAAgKgEg");
	this.shape_357.setTransform(-208.475,-76.8);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#373535").s().p("AgaA7QgJgFgEgFQgGgGgCgIQgCgJgBgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgHgDg");
	this.shape_358.setTransform(-221.1,-76.725);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgIAIIAABZIgVAAIAAh5IANAAQAEAAACAFIABANQAIgJAKgFQAKgGAMAAQAKAAAIADQAIAFAEAFQAEAFAEAJQADAJgBAKIAABNg");
	this.shape_359.setTransform(-234.15,-76.9);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgLQgFgNAAgOQAAgMAEgNQAEgKAIgJQAGgHALgFQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAFgCADQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIARgIIAFgCQAAAAABAAQABAAAAAAQABABAAAAQABABAAAAIAGAIIgJAIIgMAGIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgEQgEgFgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_360.setTransform(-251.925,-76.8);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgIAAgJAFQgHAEgJAIIAABYIgUAAIAAivIAUAAIAABHQAKgJAIgEQAKgFALAAQAKAAAHADQAIAEAFAGQAFAFADAJQACAIABAKIAABNg");
	this.shape_361.setTransform(-264.7,-79.575);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAJAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAHAEAFQAEADAGAAIAGgBIAEgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAGgHACQgIACgIAAQgOABgHgJg");
	this.shape_362.setTransform(-276.025,-78.7);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgJABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIABANQAHgIALgGQAKgGAMAAQAKAAAHADQAJAFAEAFQAFAGADAIQADAJAAAKIAABNg");
	this.shape_363.setTransform(-291.625,-76.9);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_364.setTransform(-301.525,-79.5);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#373535").s().p("AgZBVQgKgEgFgIQgHgIgDgLQgCgLAAgQQgBgOAEgLQAEgMAGgHQAIgJAJgEQAIgFAOAAQAJAAAJAEQAIAEAGAGIAAhDIAWAAIAACvIgOAAQgEAAgBgEIgCgPQgIAKgKAFQgKAGgMAAQgJAAgJgEgAgWgGQgIALgBAWQAAANADAHQACAJADAFQAEAGAGACQAFADAIAAQAKAAAIgFQAGgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgPAAgKANg");
	this.shape_365.setTransform(-316.4,-79.475);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgIABgJAEQgJAFgGAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_366.setTransform(-329.175,-76.9);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#373535").s().p("AgbA7QgIgEgFgGQgFgHgCgHQgDgJABgKIAAhNIAVAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_367.setTransform(-342.8,-76.725);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgOAFgGQAIgIALgEQAJgFAOAAQAOAAAKAFQALADAIAJQAGAGAFAOQAEANAAAMQAAANgEANQgFAMgGAHQgIAJgLAEQgLAEgNAAQgNAAgKgEgAgPgqQgGADgFAGQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_368.setTransform(-356,-76.8);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgDQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgKADgJQACgHAHgHQAGgGAGgDQAGgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFACQgFABgCADQgDADgCAGQgCAFAAAIIAAALIAjAAIAAAQIgiAAIAABmg");
	this.shape_369.setTransform(-366.65,-79.45);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBIAFACIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgCAKgBQANABAJADQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgGAAQgFAAgEABIgIAEQgDADgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgGAEgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_370.setTransform(-380.725,-76.8);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_371.setTransform(-388.875,-79.5);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgCAEQgCACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgghVg");
	this.shape_372.setTransform(-404.725,-79.325);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABCFIgVAAIAAirIAMAAIAFABIADADIBjCBIgBiFIAVAAIAACrg");
	this.shape_373.setTransform(-421.975,-79.325);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_374.setTransform(-439.575,-79.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448.6,-88.4,897.2,176.8);


(lib.Tween15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#373535").s().p("AgFAOIgFgEQgCgBgBgDIgBgGIABgFIADgEIAFgEIAFgBIAGABIAEAEIAEAEIABAFIgBAGQgCADgCABIgEAEIgGABg");
	this.shape.setTransform(282.4,82.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgFAFgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_1.setTransform(274.525,78.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgFgMABgOQAAgNADgMQAFgLAGgIQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMACAIQADAIAFAGQAGAGAHADQAIACAGAAQAIAAAGgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgFQgFgEgGgDQgFgCgIAAQgNAAgKAJg");
	this.shape_2.setTransform(263.1,78.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_3.setTransform(253.775,75.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgHgCgHQgDgHABgMIAAhNIAUAAIAABNQABANAGAIQAHAIANAAQAIAAAIgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_4.setTransform(243.9,78.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgHADQgGACgFAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHALgNAEQgLAFgOgBQgKABgKgFg");
	this.shape_5.setTransform(231.975,78.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#373535").s().p("AgSA6QgJgDgKgKQgHgIgEgMQgFgKAAgQQABgOADgLQAFgMAHgHQAHgIALgEQAKgFAMAAQAMAAAIAEQAJADAHAIQAGAGAFALQADAKAAAMIgBAHQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJQgIAEgFACIgNADIgNABQgMABgKgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgFgGgCQgGgCgGAAQgPAAgJAJg");
	this.shape_6.setTransform(219.85,78.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_7.setTransform(210.5,75.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgIgFgLQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgMAFgNgBQgLABgMgFgAgPgqQgGAEgFAFQgEAFgDAJQgCALAAAIQAAAJACAKQADAKAEAFQAFAFAGAEQAIACAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_8.setTransform(200.75,78.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373535").s().p("AA9A+IAAhNQAAgPgHgHQgFgHgNAAQgFABgFABIgIAFIgFAKQgDAFAAAHIAABNIgUAAIAAhNQAAgOgGgIQgGgHgLAAQgJAAgFAFQgIAFgFAGIAABaIgWAAIAAh5IANAAQAEAAACAFIABAMQAHgIAIgFQAJgGALAAQANAAAHAHQAHAGADAMQABgEAFgHQAFgFAFgCQAFgEAGgCIAMgBQAKAAAHAEQAHACAFAHQAFAEADAJQADAKAAAKIAABNg");
	this.shape_9.setTransform(184.4,78.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAgBQgBAAAAgBQAAAAAAgBIgQgpIhNAAIgQApIgDAEQgBACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgbhFIgFgQg");
	this.shape_10.setTransform(161.625,75.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABCFIgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_11.setTransform(144.375,75.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#373535").s().p("AAqBWQgFAAgEgFIgsg9IgEgFIgHgBIgSAAIAABIIgWAAIAAirIAwAAQAPAAAMADQANAEAGAGQAIAGAEAJQAEAJAAALQAAAJgDAIQgEAJgEAFQgFAGgJAEQgHAEgLACQAFADADAFIAzBEgAgogCIAZAAQAJAAAIgCQAGgCAGgFQAHgFABgGQADgFAAgJQAAgQgKgHQgKgIgTAAIgaAAg");
	this.shape_12.setTransform(128.55,75.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgKALAAAWQAAALADAJQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_13.setTransform(108.025,75.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#373535").s().p("AAeA+IAAhNQgBgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABZIgWAAIAAh5IANAAQAGAAAAAFIABANQAHgIALgGQAKgGAMAAQAKAAAIAEQAIAEAEAFQAFAGADAIQACAIAAALIAABNg");
	this.shape_14.setTransform(95.25,78.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_15.setTransform(82.175,78.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAEADAEIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgOAAgJgDg");
	this.shape_16.setTransform(66.325,78.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#373535").s().p("AAdA+IAAhNQABgNgHgIQgGgIgNAAQgIABgJAEQgIAFgHAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHAEQAJAEAFAFQAEAGADAIQACAIABALIAABNg");
	this.shape_17.setTransform(54.7,78.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_18.setTransform(44.825,75.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgOQAAgNAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_19.setTransform(35.425,78.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgBIADgCIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_20.setTransform(24.675,76.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgHgIgEgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAFAHAGANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAHgCAHQgCAMAAAHQAAAIACALQADAJAEAGQAFAFAGAEQAHACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_21.setTransform(13.55,78.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAABABQAAAAABAAQAAAAAAABIACAEIABATQAHgMAJgIQAIgHAMAAIAJABIAIAEIgCAQQgCADgDAAIgEgCIgKgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_22.setTransform(2.65,78.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABABAEIACAOQAHgJAKgGQALgFAMAAQAJAAAKADQAIAEAGAJQAGAHADAMQAEANAAAOQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgHAFgHAJIAAA6QAHAIAGADQAGADAJABQAQAAAJgNQAJgMAAgVQAAgNgCgIQgCgIgEgFQgDgGgGgDQgFgCgJAAQgJAAgIAEg");
	this.shape_23.setTransform(-8.925,80.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#373535").s().p("AgLAbQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAIABgEIAHgIIAEgHIABgGIgBAAIgFgBIgFgDIgDgFIgBgGIABgFIADgFIAFgDIAFAAIAGAAIAFAEIADAGIAAAHQABAGgCAFQgCAFgDAFQgBAEgFAIIgJAKg");
	this.shape_24.setTransform(-23.2,84.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgJgIgDgMQgFgMABgOQAAgNADgMQAEgJAHgKQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQACAMACAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAFgCACgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgPAAgJAJg");
	this.shape_25.setTransform(-32.1,78.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_26.setTransform(-41.425,75.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABAAAEIACAOQAIgJAKgGQAKgFAMAAQAKAAAJADQAJAEAGAJQAGAHADAMQADAKAAARQAAAMgDALQgEAMgGAJQgHAIgKAFQgJAFgNAAQgJAAgKgEQgIgEgGgHIAAA2gAgRg8QgIAGgHAIIAAA6QAHAIAHADQAGADAJABQAQAAAJgNQAKgMAAgVQAAgLgDgKQgCgIgEgFQgEgHgFgCQgGgCgIAAQgIAAgJAEg");
	this.shape_27.setTransform(-50.6,80.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#373535").s().p("AA9A+IAAhNQAAgOgGgIQgHgHgLAAIgKACQgGADgDACIgGAKQgCAIAAAEIAABNIgUAAIAAhNQAAgPgGgHQgFgHgMAAQgJAAgFAFQgGADgHAIIAABaIgVAAIAAh5IAMAAQAGAAAAAFIABAMQAGgIAKgFQAIgGALAAQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAGAHQAFAGADAHQACAKAAAKIAABNg");
	this.shape_28.setTransform(-67.45,78.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#373535").s().p("AgbA9QgFgCgFgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAJgFAOgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgFACIgJAEIgHAEQgBACgEAAIgEgBIgCgDIgEgGQAKgKALgFQAMgFANAAQALAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgDgLIgJAHQgEAEgGACIgKAEIgMABQgHAAgHgCgAACAIQgKADgGACQgGADgDAEQgEAFAAAFQAAAFACADQACAEACACQADACAEABIAIABIAJgBIAJgDIAPgMIAAgZQgPAAgKABg");
	this.shape_29.setTransform(-83.7,78.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#373535").s().p("AAlA9IgFgBIgggzIgDAGIgcAqIgCADIgEABIgTAAIAqg9Igpg8IAVAAIAEABIACADIAdAtIADgGIAagnIACgDIADgBIAUAAIgpA7IArA+g");
	this.shape_30.setTransform(-95.65,78.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgEgNQgFgNAAgNQAAgOAFgLQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAJAAANIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgNADIgMABQgNABgKgFgAgUglQgJAJgCAQIBBAAQAAgGgBgIQgDgGgEgFQgFgFgFgCQgFgCgHAAQgPAAgJAJg");
	this.shape_31.setTransform(-107.3,78.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACIACAEIACATQAGgMAIgIQAJgHAMAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgJAHgDAMIAABMg");
	this.shape_32.setTransform(-122.4,78.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgIgFgLQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQALAEAHAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgGAJgMAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIAEQAGACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_33.setTransform(-134.55,78.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgMADgHQADgIAGgGQAFgGAGgDQAHgCAKAAQAKAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgFACgCAEQgEADgBAFQgCAHAAAGIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_34.setTransform(-145.15,75.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#373535").s().p("AgLAbQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIABgEIAHgIIAEgHIABgGIgBAAIgFgBIgFgDIgDgFIgBgGIABgFIADgFIAFgDIAFAAIAGAAIAFAEIADAGIABAHIgCALIgEAKQgCAEgGAIIgIAKg");
	this.shape_35.setTransform(-156.425,84.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAFgCIAHgDQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgFgBgFgEQgEgDgDgGQgDgGAAgIQAAgGADgHQAEgHAEgEQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDABgCAEQgCAEAAADQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgDAIgFAEQgGAFgJAEQgIACgKAAQgOAAgKgDg");
	this.shape_36.setTransform(-164.375,78.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#373535").s().p("AgJBYIAAivIAUAAIAACvg");
	this.shape_37.setTransform(-172.5,75.425);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_38.setTransform(-178.65,75.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#373535").s().p("AgRA6QgLgDgIgKQgIgIgEgMQgEgMgBgOQAAgNAEgMQAEgJAIgKQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAKABAMQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAGAHQAFAGAHADQAIACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgCgFQgDgGgDgFQgEgEgGgDQgHgCgGAAQgPAAgIAJg");
	this.shape_39.setTransform(-188.05,78.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_40.setTransform(-199.675,78.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgCQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgMADgHQACgIAHgGQAFgGAGgDQAIgCAKAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgEACgEAEQgCACgCAGQgCAFAAAIIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_41.setTransform(-214.1,75.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgGgFgNQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIAEQAGACAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_42.setTransform(-224.9,78.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgIgNAAQgJABgIAEQgJAGgGAGIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIAEQAHADAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_43.setTransform(-242.725,78.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgIgIgDgLQgEgKAAgQQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgGAIgMAFQgLAFgNgBQgNABgKgFgAgPgqQgHAEgEAFQgFAHgCAHQgCAJAAAKQAAAMACAHQADAJAEAGQAEAFAHAEQAHACAIAAQASAAAJgLQAJgMAAgWQAAgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_44.setTransform(-256.2,78.2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_45.setTransform(-265.925,75.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgBIADgCIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_46.setTransform(-273.525,76.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACQgFABgEADIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgDAFAAAFQABAFABADIAFAGQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_47.setTransform(-284.25,78.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_48.setTransform(-295.525,78.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_49.setTransform(-304.425,75.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_50.setTransform(-310.575,75.425);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#373535").s().p("Ag1BSIAAiiIANAAQAFABABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAEAGAJQAGAHADAMQAEAKAAARQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgHgFgGQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_51.setTransform(-319.775,80.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#373535").s().p("AgSA6QgJgDgKgKQgHgIgEgMQgFgKAAgQQABgOADgLQAFgMAHgHQAGgHAMgFQAKgFAMAAQAMAAAIAEQAJADAHAIQAGAGAFALQADAKAAAMIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAIhQAAQAAAMADAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgIAEgEACIgOADIgMABQgNABgKgFgAgUglQgIAJgDAQIBCAAQgBgIgCgGQgCgGgEgFQgEgFgGgCQgGgCgGAAQgPAAgJAJg");
	this.shape_52.setTransform(-333.2,78.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQABAAAAAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgLAKgJQAJgHAMAAIAJABQAEACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgJgBQgMAAgGAHQgIAGgEANIAABMg");
	this.shape_53.setTransform(-343.7,78.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgMAAgOQAAgNAFgMQADgLAHgIQAIgHAKgFQALgFANAAQALAAAJAEQAJAEAHAHQAGAGAEALQAEAKgBAMQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQABAMABAIQADAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgGAEQgEAEgHACIgNADIgNABQgLABgMgFgAgUglQgIAJgCAQIBAAAQAAgJgBgFQgDgGgEgFQgEgEgFgDQgHgCgGAAQgOAAgKAJg");
	this.shape_54.setTransform(-360.1,78.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgIAKgFQAJgFAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_55.setTransform(-372.875,75.425);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgBIADgCIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgHAHgGACQgIACgIAAQgOABgHgJg");
	this.shape_56.setTransform(-384.175,76.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgHgIgMAAQgIABgJAEQgIAFgHAHIAABZIgVAAIAAh5IAMAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHAEQAJAEAEAFQAEAGAEAIQACAKABAJIAABNg");
	this.shape_57.setTransform(-399.8,78.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_58.setTransform(-409.675,75.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgJAGgNAAQgJAAgKgEgAgVgGQgKAKAAAXQAAAJACALQACAJAEAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_59.setTransform(-424.575,75.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_60.setTransform(-433.875,75.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_61.setTransform(-443.225,78.175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIAKgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgNgBQgMABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJgBAKQABAMACAHQACAKAEAFQAEAFAIADQAHADAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgHADg");
	this.shape_62.setTransform(422.55,49.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_63.setTransform(411.425,47.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAHAEAFQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_64.setTransform(397.825,47.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAEgIAIIAABYIgVAAIAAh4IANAAQAFAAAAAFIACANQAHgIALgGQAJgGANAAQAJAAAJAEQAHADAFAGQAEAGAEAIQADAKgBAJIAABMg");
	this.shape_65.setTransform(386.85,49.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_66.setTransform(376.975,46.7);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQAAAAABAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgMAKgIQAJgHAMAAIAJABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAGgEANIAABMg");
	this.shape_67.setTransform(369.65,49.275);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJAKgGQALgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEANAAAOQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgHAFgHAJIAAA6QAHAIAGADQAGADAJABQAQAAAJgNQAJgMAAgVQAAgNgCgIQgCgIgEgFQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_68.setTransform(358.075,51.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#373535").s().p("AgdAJIAAgRIA6AAIAAARg");
	this.shape_69.setTransform(346.8,48.275);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgEgMgBgPQAAgMAFgMQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAHAGAEALQADAKAAAMQAAAGAAABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJAEALQACAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgKABgMgFgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgCgGgEgFQgFgFgFgCQgHgCgHAAQgOAAgIAJg");
	this.shape_70.setTransform(336.3,49.4);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgGgCgIQgDgHAAgMIAAhNIAWAAIAABNQgBANAHAIQAGAIANAAQAJAAAIgFQAIgEAHgIIAAhZIAWAAIAAB5IgOAAQgEAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgIgDg");
	this.shape_71.setTransform(323.25,49.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_72.setTransform(313.625,46.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#373535").s().p("AgSBVQgHgEgIgJIgBALQAAAEgFAAIgOAAIAAivIAWAAIAABIQAJgJAIgFQAKgFAMAAQALAAAHAEQAJAFAGAHQAGAHAEAMQACALABAPQgBAOgDALQgDALgIAJQgGAJgKAEQgKAFgMAAQgKAAgJgEgAgRgNQgJAGgFAHIAAA6QAFAIAIADQAGAEAJAAQAQAAAKgNQAIgMAAgWQAAgNgCgHQgCgIgDgFQgFgGgFgCQgFgDgJAAQgJAAgIAFg");
	this.shape_73.setTransform(304.35,46.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgJAEIgIAEQgCACgDAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgDgLIgJAHQgFAEgEACIgKAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQgBAFACADQACAEADACQACACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgKABg");
	this.shape_74.setTransform(286.25,49.375);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgIgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAGAHAFANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAFgNgBQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_75.setTransform(269.05,49.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_76.setTransform(257.875,47.5);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#373535").s().p("AgZBVQgKgFgFgHQgFgHgFgMQgCgLAAgQQgBgOAEgLQAEgKAGgJQAHgJAKgEQAJgFANAAQAKAAAIAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgKAGgMAAQgJAAgJgEgAgWgGQgIALgBAWQAAANACAHQADAJADAFQAEAGAGACQAFADAIAAQAKAAAIgFQAIgGAGgHIAAg6QgFgIgIgDQgIgEgHAAQgRAAgJANg");
	this.shape_77.setTransform(241.6,46.725);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgEgNQgEgNgBgOQABgNAEgLQAEgLAGgIQAIgHAKgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAKgBAMIgBAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAMACAIQAEAJAEAFQAGAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgHAFQgFAEgGACIgOADIgMABQgMABgLgFgAgUglQgJAJgBAQIBAAAQAAgGgBgIQgCgGgFgFQgFgFgFgCQgGgCgGAAQgPAAgJAJg");
	this.shape_78.setTransform(229.05,49.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQAAABAAAAIACATQAGgMAJgIQAJgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgMAAgFAHQgIAGgFANIAABMg");
	this.shape_79.setTransform(218.6,49.275);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACQgFABgFADIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQAKgFAOAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgBgBgBgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQAAAFACADQABAEACACQACACAFABIAIABIAJgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_80.setTransform(206.85,49.375);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEAKAAARQAAANgEAKQgDALgHAKQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgHgFgGQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_81.setTransform(194.825,51.35);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgMAAIgKACQgFADgDACIgGAJQgCAGAAAHIAABMIgUAAIAAhMQAAgNgGgJQgFgHgMAAQgJAAgFAFQgGADgHAIIAABZIgWAAIAAh4IANAAQAGAAAAAFIABAMQAHgIAJgFQAIgGALAAQANAAAHAHQAHAHADALIAGgLQAFgFAFgCQAFgEAGgCIAMgBQAKAAAHAEQAHACAFAHQAHAGACAHQACAKAAAKIAABMg");
	this.shape_82.setTransform(178,49.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgKAAgQQAAgOAEgLQAEgMAIgIQAIgIAKgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgEALgIAIQgHAJgLAEQgKAFgOgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_83.setTransform(161.325,49.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgGgIgFgMQgEgNAAgNQAAgOAEgKQAEgMAHgIQAHgIAKgFQAMgFAMAAQANAAAKAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgHADQgFACgGAIQgFAFgCAJQgCAHAAALQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgCADgCIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgLAFgOgBQgKABgKgFg");
	this.shape_84.setTransform(149.275,49.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgDgNAAgOQAAgNADgLQAEgLAHgIQAHgHALgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAKAAAMIgCAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMACAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgFAEgGACIgOADIgNABQgLABgLgFgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgFgCgIAAQgOAAgJAJg");
	this.shape_85.setTransform(132.5,49.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#373535").s().p("AgSBVQgIgFgGgIIgBALQgBAEgFAAIgOAAIAAivIAWAAIAABIQAIgJAJgFQAKgFAMAAQAKAAAJAEQAIAFAGAHQAGAIADALQAEAKAAAQQAAAMgEANQgDALgHAJQgHAJgKAEQgJAFgNAAQgKAAgJgEgAgRgNQgIAFgGAIIAAA6QAHAJAGACQAGAEAJAAQAQAAAJgNQAKgLAAgXQAAgLgDgJQgBgIgFgFQgDgGgGgCQgFgDgIAAQgJAAgJAFg");
	this.shape_86.setTransform(120.025,46.725);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_87.setTransform(101.675,49.3);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHACAGAHQAFAFADAKQADAHAAALIAABNIgPgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADQACAEADACQACACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_88.setTransform(88.575,49.375);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgIgKgDgKQgFgMABgOQAAgMADgMQAEgMAHgIQAJgIAJgFQALgFANAAQAOAAAJAFQAJADAIAIIgFAIIgCACIgEAAIgEgBIgFgDIgHgEQgFgBgHAAQgJAAgGADQgGADgFAHQgFAGgCAIQgDAJAAAJQAAALADAIQADAJAEAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAIAHAHQgJALgMAEQgLAFgNgBQgLABgKgFg");
	this.shape_89.setTransform(77.3,49.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_90.setTransform(62.375,47.5);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#373535").s().p("AgLBWIAAirIAXAAIAACrg");
	this.shape_91.setTransform(54.225,46.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#373535").s().p("AgFAOIgEgEQgCgBgCgDIgBgGIABgFQACgDACgBIAEgEIAFgBIAGABIAFAEIADAEIABAFIgBAGIgDAEIgFAEIgGABg");
	this.shape_92.setTransform(43.35,54.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgJAFgGAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIAEQAHADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_93.setTransform(34.275,49.3);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#373535").s().p("AgXA6QgMgFgGgIQgJgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAIgIQAHgIALgEQAKgFANAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgHAIgLAFQgKAFgOgBQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAGQAFAFAGADQAHADAIAAQASAAAJgLQAJgMgBgWQABgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_94.setTransform(20.8,49.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_95.setTransform(11.075,46.7);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_96.setTransform(3.475,47.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAMgLAKgEQAKgFAOAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgDgLIgJAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQAAAFACADQABAEACACQADACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_97.setTransform(-7.25,49.375);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgLAAIgLACQgFADgDACIgFAJQgCAGAAAHIAABMIgVAAIAAhMQAAgNgFgJQgGgHgMAAQgIAAgHAFQgHAEgFAHIAABZIgWAAIAAh4IAOAAQAEAAABAFIABAMQAIgIAHgFQAJgGALAAQANAAAHAHQAHAHADALQABgEAGgHQAFgFAEgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAFAHQAHAGABAHQAEAKAAAKIAABMg");
	this.shape_98.setTransform(-22.85,49.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIABATQAHgMAJgIQAIgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgJAHgEAMIAABMg");
	this.shape_99.setTransform(-37.05,49.275);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgHgHgFgMQgEgNAAgNQAAgMAEgNQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQALAEAHAIQAIAIAEAMQAEANAAAMQAAANgEANQgDALgJAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgHAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAHADQAHADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_100.setTransform(-49.2,49.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgJAFgFQAHgGAGgDQAGgCALAAQAJAAAGACIAAALQgBABAAAAQAAABAAAAQgBAAAAAAQAAABgBAAIgJAAQgFAAgFABQgFACgCAEQgEACgBAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_101.setTransform(-59.825,46.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_102.setTransform(-70.475,49.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_103.setTransform(-80.325,46.7);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#373535").s().p("AgRBXIAAhmIgOgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIAUAAIAAgMQAAgLADgHQABgHAHgHQAGgGAGgDQAGgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgIAAQgGAAgFABQgFACgCAEQgDACgCAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_104.setTransform(-92.05,46.75);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQAEgMAHgIQAIgIAKgEQAKgFAOAAQAOAAAJAFQALAEAHAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgMgBQgNABgLgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJAAAKQAAAMACAHQACAKAEAFQAEAFAIADQAGADAJAAQARAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgRAAQgJAAgGADg");
	this.shape_105.setTransform(-102.85,49.4);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgNAAgOQAAgNAFgLQADgLAIgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAGAGAEALQAFAJgBANIAAAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgMADIgOABQgLABgLgFgAgUglQgJAJgCAQIBCAAQAAgGgCgIQgCgGgEgFQgFgFgFgCQgHgCgHAAQgOAAgJAJg");
	this.shape_106.setTransform(-120.45,49.4);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgKAFgGQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAGgGAIgCQAJgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAHgEAJQgEAIgFAEQgGAFgJADQgIADgJAAQgKAAgGgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgWgDIgMAAQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAGgCQAFgCAEgDQADgDACgFQACgGAAgEQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_107.setTransform(-132.725,51.475);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgKAEIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgCgLIgKAHQgEAEgFACIgKAEIgNABQgIAAgFgCgAACAIIgQAFQgGAEgDADQgDAFgBAFQABAFACADQABAEACACQACACAFABIAIABIAJgBIAJgDIAPgMIAAgZQgOAAgLABg");
	this.shape_108.setTransform(-145.25,49.375);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAGgMAJgIQAKgHALAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgEAMIAABMg");
	this.shape_109.setTransform(-154.9,49.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAEgMAIgIQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAJAIQAHAIAEAMQAEALAAAOQAAAQgEAKQgEALgHAIQgIAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgHAEgEAFQgEAFgCAJQgDAJAAAKQAAAMADAHQACAKAEAFQAEAFAHADQAIADAHAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_110.setTransform(-167.05,49.4);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_111.setTransform(-178.175,47.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDABgBAEQgCADAAAEQAAAFADADIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgOAAgJgDg");
	this.shape_112.setTransform(-187.975,49.4);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgIQgHgHgMAAIgJACIgJAFIgGAJQgCAGAAAHIAABMIgUAAIAAhMQAAgOgGgIQgFgHgMAAQgJAAgGAFQgHAEgFAHIAABZIgVAAIAAh4IAMAAQAFAAABAFIABAMQAIgIAIgFQAHgGAMAAQANAAAHAHQAHAHADALQACgEAFgHQAEgFAFgCQAFgEAGgCIAMgBQAJAAAIAEQAHACAGAHQAEAEAEAJQACAKAAAKIAABMg");
	this.shape_113.setTransform(-207.4,49.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAIABATQAHgMAJgIQAIgHAMAAIAJABQAFACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAIgGgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_114.setTransform(-221.625,49.275);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgEgMgBgPQAAgNAEgLQAEgLAIgIQAGgHAMgFQAKgFAMAAQALAAAKAEQAJAEAGAHQAHAGAEALQADAKABAMIgBAHQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAJADALQADAJAFAFQAFAGAGADQAIACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgNADIgMABQgLABgMgFgAgTglQgKAJgBAQIBBAAQAAgGgCgIQgDgGgEgFQgEgFgFgCQgHgCgHAAQgOAAgIAJg");
	this.shape_115.setTransform(-233.4,49.4);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_116.setTransform(-244.125,47.5);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgHgEgDgGQgDgGAAgGQAAgKAFgGQAGgGAKgEQgFgCgEgEQgCgEAAgHIABgFIACgFIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgKAEgHQADgHAGgFQAHgGAHgCQAJgDAKAAQAIAAAGACQAHACAFADIAhAAIAAAIQABAEgGABIgOACQAEAHAAALQAAAJgDAHQgEAIgGAEQgFAGgJACQgHADgKAAQgJAAgHgCQgDACgDADQgCACAAADQAAAEADACQAFADAFABIAbABIAPABQAGABAHADQAGAEADAFQADAFABAJQAAAIgFAHQgDAIgIAFQgJAHgJACQgKAEgNAAQgLAAgLgDgAghAmQgDAEAAAHQAAAFACACQACAEAEADQAEACAHACQAGABAJAAQAIAAAGgBQAIgCAEgDQADgCAEgFQADgFAAgEQAAgEgDgDQgDgDgDgCIgLgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgHAHAAALQAAAGADAEQABAFADADQAEADAEACQAIACAEAAQADAAAIgCQADgBAFgEIAFgIQABgEAAgGQABgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_117.setTransform(-259.25,51.475);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_118.setTransform(-272.025,49.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgKAAgQQAAgOAEgLQAEgMAHgIQAIgIALgEQAKgFANAAQAPAAAJAFQAKAEAIAIQAIAIADAMQAFAMAAANQAAAOgFAMQgDALgIAIQgHAJgLAEQgKAFgOgBQgMABgLgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAGQAEAFAHADQAHADAIAAQASAAAJgLQAIgNAAgVQAAgUgIgNQgJgMgSAAQgIAAgHADg");
	this.shape_119.setTransform(-285.5,49.4);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_120.setTransform(-295.275,46.625);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAFgCIAHgDQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgFgBgFgEQgEgDgDgGQgDgGAAgIQAAgGADgHQAEgHAEgEQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDABgCAEQgCAEAAADQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgDAIgFAEQgGAFgJAEQgIACgKAAQgOAAgKgDg");
	this.shape_121.setTransform(-308.325,49.4);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_122.setTransform(-316.425,46.7);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#373535").s().p("AA+BWIgEgCIgDgEIgRgpIhLAAIgRApIgCAEQgDACgDAAIgSAAIBGirIAWAAIBECrgAgBg2IgeBMIA/AAIgghVg");
	this.shape_123.setTransform(-332.3,46.875);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#373535").s().p("AA6BWIgFgBIgEgDIhiiBIABAGIAAB/IgUAAIAAirIALAAIAFABIAEADIBiCBIgBgGIAAh/IAUAAIAACrg");
	this.shape_124.setTransform(-349.55,46.875);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#373535").s().p("AhJBWIAAirIBAAAQASAAAQAGQAOAGAMAMQALALAHAQQAFAQAAASQAAAUgFAPQgHAQgLALQgMAMgOAGQgQAGgSAAgAgyBDIApAAQANAAALgEQAMgFAHgJQAIgIAEgNQAEgKABgSQgBgQgEgLQgEgNgIgIQgHgJgMgFQgLgEgNAAIgpAAg");
	this.shape_125.setTransform(-367.15,46.875);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgCQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQABgKACgIQACgIAGgGQAHgGAGgDQAHgCAKAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFABQgEACgDAEQgEACgBAGQgCAEAAAJIAAALIAjAAIAAAPIgiAAIAABng");
	this.shape_126.setTransform(-385.3,46.75);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIAKgEQAKgFANAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEANAAAMQAAANgEANQgEALgIAIQgHAJgLAEQgLAFgNgBQgLABgMgFgAgOgqQgIAEgEAFQgEAFgCAJQgDALAAAIQAAAJADAKQACAKAEAFQAEAFAIADQAGADAIAAQASAAAJgLQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgGADg");
	this.shape_127.setTransform(-396.1,49.4);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgFgMQgDgNAAgOQgBgNAEgLQAFgMAGgHQAIgHAKgFQALgFAMAAQALAAAJAEQAJADAHAIQAHAGADALQAFALAAALIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgEAEgIACIgMADIgOABQgMABgKgFgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgFQgGgFgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_128.setTransform(-413.7,49.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_129.setTransform(-423.025,46.625);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQAEgMAHgIQAIgIAKgEQAKgFAOAAQANAAAKAFQALAEAHAIQAIAIAEAMQAEALAAAOQAAAQgEAKQgDALgJAIQgGAJgMAEQgLAFgMgBQgMABgMgFgAgOgqQgIAEgEAFQgEAFgCAJQgCAJAAAKQAAAMACAHQACAKAEAFQAEAFAIADQAGADAJAAQASAAAIgLQAJgNAAgVQAAgUgJgNQgIgMgSAAQgJAAgGADg");
	this.shape_130.setTransform(-432.8,49.4);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAIABATQAGgMAKgIQAIgHAMAAIAJABIAIAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgJgBQgMAAgGAHQgIAHgFAMIAABMg");
	this.shape_131.setTransform(-443.65,49.275);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAEgHAIIAABYIgWAAIAAh4IANAAQAEAAACAEIABAOQAIgJAKgFQAKgFAMgBQAKAAAIAEQAIAEAEAFQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_132.setTransform(431.5,20.5);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_133.setTransform(421.625,17.9);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgDgDgHQgDgFAAgJQAAgIAEgGQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgKAEIgGAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQAKgFAOAAQALAAAIAEQAIADAFAGQAFAGADAJQADAJAAAJIAABNIgKAAIgFgBQgCgBAAgDIgDgLQgFAFgEACQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_134.setTransform(412.275,20.575);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgHgIgLAAIgKACQgGADgCADIgHAIQgBAJAAAEIAABMIgVAAIAAhMQAAgOgFgHQgGgIgMAAQgIAAgHAFQgFADgHAIIAABZIgWAAIAAh4IAOAAQAEAAABAEIACANQAGgIAJgFQAIgFALgBQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgDQAFgDAGgCIAMgBQAJAAAIAEQAIADAFAGQAFAGACAHQAEAKAAAKIAABMg");
	this.shape_135.setTransform(396.65,20.5);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgIgIgEgMQgFgMABgPQAAgMADgMQAEgJAIgKQAHgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgHgCgGAAQgOAAgKAJg");
	this.shape_136.setTransform(375.7,20.6);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgJAFgGAHIAABYIgWAAIAAivIAWAAIAABHQAJgJAIgEQAJgFAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_137.setTransform(362.925,17.825);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#373535").s().p("AgKBWIAAiXIg4AAIAAgUICFAAIAAAUIg3AAIAACXg");
	this.shape_138.setTransform(349.025,18.075);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#373535").s().p("AgFAOIgFgEIgDgEIgBgGIABgFIADgEIAFgEIAFgBIAFABIAGAEQACABABADIABAFIgBAGQgBADgCABIgGAEIgFABg");
	this.shape_139.setTransform(334.8,25.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAGABQAFgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgEgCIgLgFIgKgDQgHgCgFgDQgGgCgEgDQgEgDgDgGQgDgGAAgIQAAgGADgHQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgFgDIgIgEQgFgBgGAAQgEAAgFABIgHAFQgDACgCADQgCACAAAFQAAAFADADQADADAEACIAhAMIAKAFQADADAEAGQACAEAAAJQAAAJgDAGQgCAHgGAGQgGAEgJAEQgJACgKAAQgNAAgKgDg");
	this.shape_140.setTransform(326.875,20.6);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgEgNAAgOQAAgNAEgLQAFgLAHgIQAGgHAMgFQAKgFAMAAQAMAAAJAEQAJAEAGAHQAGAGAEALQAFAJAAANIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAEgGAFQgGAEgHACIgMADIgOABQgMABgKgFgAgUglQgJAJgCAQIBCAAQAAgGgDgIQgCgGgDgFQgGgFgEgCQgHgCgHAAQgOAAgJAJg");
	this.shape_141.setTransform(315.5,20.6);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAHACAFABQAGgBAEgCIAIgDQADgDABgEIACgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAIAEQAKADAHAIIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_142.setTransform(303.925,20.6);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#373535").s().p("AgaA7QgIgEgFgGQgEgFgEgJQgCgJgBgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_143.setTransform(292,20.675);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#373535").s().p("AgkA+IAAh5IANAAQABAAAAAAQABAAABABQAAAAABAAQAAAAAAABIACAEIACATQAFgLAKgJQAIgHANAAIAJABQAFACACACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAGgEANIAABMg");
	this.shape_144.setTransform(281.25,20.475);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_145.setTransform(272.775,17.9);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAAAAAQABAAABABQAAAAAAAAQABAAAAABIADADIAfBNIADARIAFgRIAfhNIADgDQAAgBABAAQAAAAAAAAQABgBABAAQAAAAABAAIAQAAIgxB5g");
	this.shape_146.setTransform(263.525,20.575);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAGgCABQAAABAAAAQAAAAgBAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQAAAAABAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_147.setTransform(246.425,20.6);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGIgGAIQgCAJAAAEIAABMIgUAAIAAhMQAAgOgGgHQgFgIgMAAQgJAAgGAFQgFADgHAIIAABZIgVAAIAAh4IAMAAQAFAAABAEIACANQAHgIAIgFQAIgFALgBQANAAAHAHQAHAGADAMQADgGAEgFQAEgFAFgDQAEgCAHgDIAMgBQAJAAAIAEQAIACAFAHQAEAEAEAJQACALAAAJIAABMg");
	this.shape_148.setTransform(230.475,20.5);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgHgIgEgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAFAHAGANQAEANAAAMQAAANgEANQgFAMgGAHQgIAIgLAFQgLAEgNAAQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_149.setTransform(213.8,20.6);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAFABQAGgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgFgCQgBgCgJgDIgKgDQgHgCgFgDQgGgBgEgEQgEgDgDgGQgDgFAAgJQAAgFADgIQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgGgDIgHgEIgLgBQgFAAgEABIgHAFIgFAFQgCADAAAEQAAAFADADQADADAEACIAgAMIALAFQAEAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAGQgEAEgKAEQgJACgKAAQgNAAgKgDg");
	this.shape_150.setTransform(201.775,20.6);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#373535").s().p("AgZBRQgLgDgGgEQgHgEgDgGQgEgHAAgFQABgKAFgGQAGgGAKgEQgFgCgDgEQgDgEAAgHIAAgFIAEgFIAEgFIAHgFQgJgEgFgJQgFgKAAgJQAAgKADgHQAEgHAGgFQAHgGAHgCQAJgDAKAAQAIAAAGACQAHACAFADIAiAAIAAAIQAAAEgGABIgNACQADAHAAALQAAAIgCAIQgFAIgFAEQgGAFgJADQgIADgJAAQgKAAgGgCQgEACgCADQgBACAAADQAAAEADACQAEADAFABIAbABIAPABQAHABAGADQAGADADAGQADAFAAAJQAAAIgDAHQgFAIgGAFQgKAHgIACQgLAEgMAAQgNAAgKgDgAggAmQgEAFgBAGQAAAFADACQACAEAEADQAGADAFABQAGABAJAAQAIAAAHgBQAGgCAFgDQAFgDACgEQADgFAAgEQAAgEgDgDQgBgDgGgCIgKgCIgXgBQgHAAgFgBQgGACgFAGgAgWg9QgIAHAAALQAAAEACAGQACAEAEAEQAEAEAEABQAGACAFAAQAEAAAGgCQAEgBAFgEQAEgEABgEQABgEAAgGQAAgLgGgHQgHgGgMAAQgNAAgGAGg");
	this.shape_151.setTransform(186.05,22.675);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgOAAQgIABgIAEQgIAEgHAIIAABYIgWAAIAAh4IANAAQAFAAAAAEIACAOQAHgIALgGQAJgFANgBQAKAAAIAEQAHADAFAGQAEAGAEAIQADAKAAAJIAABMg");
	this.shape_152.setTransform(173.3,20.5);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_153.setTransform(163.425,17.9);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgHgIgDgLQgDgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAJgFANAAQAJAAAJAEQAIAEAGAGIAAhDIAVAAIAACvIgMAAQgFAAgBgEIgCgPQgHAKgLAFQgKAGgMAAQgKAAgJgEgAgWgGQgJALAAAWQAAANADAHQABAJAEAFQAEAGAGACQAFADAIAAQAKAAAHgFQAHgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgPAAgKANg");
	this.shape_154.setTransform(153.15,17.925);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#373535").s().p("AgbA7QgIgEgEgGQgGgGgCgIQgDgHAAgMIAAhNIAWAAIAABNQgBANAHAIQAHAIANAAQAIAAAIgFQAIgEAHgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgIgDg");
	this.shape_155.setTransform(140.1,20.675);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_156.setTransform(130.475,17.825);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgJgEgLQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAIACAJAJIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgGADQgGACgGAIQgFAGgCAIQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHAKgMAFQgMAEgOAAQgKABgKgFg");
	this.shape_157.setTransform(122.025,20.6);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgIAEgIAIIAABYIgUAAIAAh4IAMAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAEAGAEAIQACAKABAJIAABMg");
	this.shape_158.setTransform(109.7,20.5);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_159.setTransform(99.825,17.9);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_160.setTransform(86.775,20.6);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGQgEAEgBAEQgDAHAAAGIAABMIgUAAIAAhMQAAgOgGgHQgFgIgMAAQgJAAgGAFQgFADgHAIIAABZIgVAAIAAh4IAMAAQAFAAABAEIACANQAHgIAIgFQAIgFALgBQAMAAAIAHQAHAGADAMQACgGAFgFQADgEAGgEQAEgCAHgDIAMgBQAJAAAIAEQAIACAFAHQAEAEAEAJQACALAAAJIAABMg");
	this.shape_161.setTransform(71.975,20.5);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#373535").s().p("AgZA7QgIgDgJgIIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAHACAFABQAGgBAEgCQAFgBADgCQADgDACgEIABgIQAAgFgCgDQgDgDgFgCQgBgCgJgDIgKgDQgHgCgFgDQgGgBgEgEQgEgDgDgGQgDgFAAgJQAAgFADgIQADgGAFgFQAGgFAIgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgEAHQgCADgDAAIgEgBIgNgHQgFgBgGAAQgFAAgEABIgHAFIgFAFQgCADAAAEQAAAFADADQADADAEACIAgAMIALAFQAEAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAGQgEAEgKAEQgJACgKAAQgNAAgKgDg");
	this.shape_162.setTransform(56.625,20.6);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_163.setTransform(48.525,17.9);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgHAEgJAIIAABYIgVAAIAAh4IANAAQAEAAACAEIABAOQAHgIALgGQAJgFANgBQAKAAAIAEQAHADAFAGQAFAGADAIQADAKgBAJIAABMg");
	this.shape_164.setTransform(38.9,20.5);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQADgHAKgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgCACgEAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGADgEAEQgDAFAAAFQABAFABADIAFAGQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_165.setTransform(25.8,20.575);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgIgFgCgFQgEgGAAgGQAAgJAGgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEABgBIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgJADgIQAEgIAGgEQAHgGAHgCQAJgDAKAAQAHAAAHACQAHACAFADIAhAAIAAAIQAAAEgFABIgOACQAEAIAAAKQAAAJgDAHQgDAHgHAFQgGAGgIACQgIADgJAAQgJAAgHgCQgDACgDADQgCABAAAEQAAAEADACQAGADADABIAcABQAIAAAHABQAGABAHADQAFADAEAGQADAFABAJQAAAHgFAIQgDAIgIAFQgJAHgJACQgKAEgNAAQgMAAgKgDgAghAmQgEAEAAAHQAAAEADADQAAADAGAEQAFADAGABQAGABAJAAQAIAAAGgBQAIgCAEgDQAEgCADgFQADgFAAgEQAAgEgDgDQgCgDgEgCIgLgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgGAHgBALQAAAGACAEQACAFADADQAEADAEACQAIACAEAAQADAAAIgCQAEgCAEgDQADgDABgFQACgEAAgGQAAgLgGgHQgHgGgMAAQgNAAgHAGg");
	this.shape_166.setTransform(13.9,22.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAGgLAKgJQAIgHAMAAIAJABQAFACADACIgDAQQAAABAAAAQAAABgBAAQAAAAgBABQgBAAgBAAIgFgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_167.setTransform(3.425,20.475);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#373535").s().p("AgXA6QgMgFgHgIQgIgIgDgLQgEgNAAgNQAAgMAEgNQAEgMAHgIQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAHAIQAHAHAFANQAEANAAAMQAAANgEANQgFAMgHAHQgGAIgMAFQgLAEgNAAQgNABgKgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAMAAAHQAAAIACALQADAJAEAFQAEAGAHADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_168.setTransform(-8.7,20.6);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgJAFgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAIgGAHgCQAIgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAJgEAHQgEAIgFAEQgGAFgJADQgIADgJAAQgJAAgHgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgKgCIgYgBQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAHgCQAEgCAEgDQADgDACgFQACgGAAgEQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_169.setTransform(-26.025,22.675);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAFAAABAEIACAOQAGgIAMgGQAJgFAMgBQAKAAAHAEQAJAEAEAFQAEAGAEAIQACAKABAJIAABMg");
	this.shape_170.setTransform(-38.8,20.5);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_171.setTransform(-48.675,17.9);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAABAAQAAAAABABQAAAAABAAQAAAAABABIACADIAeBNIAEAJIAAAIIAFgRIAfhNIACgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAABAAIAQAAIgyB5g");
	this.shape_172.setTransform(-57.9,20.575);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgEgEIgEgEIgBgGIABgGIAEgFIAEgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_173.setTransform(-67.1,17.9);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_174.setTransform(-73.275,17.825);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_175.setTransform(-84.025,17.825);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_176.setTransform(-90.175,17.825);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQALgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_177.setTransform(-99.525,20.575);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgJAGgFQAFgGAGgDQAHgCAKAAQAKAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgKAAQgGAAgEABQgFACgCAEQgEADgCAFQgBAHAAAGIAAALIAjAAIAAAPIgjAAIAABng");
	this.shape_178.setTransform(-114,17.95);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgJgIgDgLQgEgLAAgPQAAgOAEgLQAEgMAIgIQAIgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAHAIAFAMQAEANAAAMQAAANgEANQgFAMgHAHQgHAJgLAEQgLAEgNAAQgNABgKgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_179.setTransform(-124.8,20.6);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgGAFgHADQgIACgIAAQgNABgIgJg");
	this.shape_180.setTransform(-140.625,18.7);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#373535").s().p("AAdA9IAAhMQAAgNgGgIQgGgIgOAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAIAAALIAABMg");
	this.shape_181.setTransform(-151.6,20.5);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgHgIgFgMQgEgMAAgPQAAgMADgMQAEgJAHgKQAIgHALgFQAKgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgPAAgIAJg");
	this.shape_182.setTransform(-164.75,20.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#373535").s().p("AA9A9IAAhMQAAgOgGgHQgHgIgLAAIgKACQgHADgBADIgGAIQgCAJAAAEIAABMIgVAAIAAhMQAAgNgFgIQgGgIgMAAQgIAAgHAFQgFADgHAIIAABZIgWAAIAAh4IAOAAQAEAAABAEIACANQAGgJAJgEQAIgFALgBQANAAAHAHQAHAHADALQADgGAEgFQAEgFAFgDQAFgDAGgCIAMgBQAJAAAIAEQAHACAGAHQAFAGACAHQAEAKAAAKIAABMg");
	this.shape_183.setTransform(-180.7,20.5);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#373535").s().p("Ag1BSIAAihIANAAQAFAAABAEIACAOQAHgJALgGQAKgFAMAAQAJAAAKADQAIAFAGAIQAGAHADAMQAEAKAAARQAAALgEAMQgDAMgHAJQgHAIgKAFQgJAFgNAAQgJAAgJgEQgJgEgFgHIAAA2gAgRg8QgIAGgGAIIAAA6QAGAIAHADQAGADAJABQAQAAAJgNQAKgNAAgUQAAgLgDgKQgBgIgFgFQgDgGgGgDQgFgCgIAAQgKAAgIAEg");
	this.shape_184.setTransform(-196.825,22.55);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgJgIgDgLQgEgLAAgPQAAgOAEgLQAEgMAIgIQAHgIALgEQAKgFANAAQAOAAAKAFQALAEAHAIQAGAHAGANQAEANAAAMQAAANgEANQgFAMgHAHQgHAIgLAFQgKAEgOAAQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAFQAFAGAGADQAHADAIAAQASAAAJgMQAJgLgBgWQABgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_185.setTransform(-210.6,20.6);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_186.setTransform(-220.375,17.825);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgNQgDgNAAgOQAAgNADgLQAEgLAHgIQAHgHALgFQALgFAMAAQALAAAJAEQAKAEAHAHQAGAGAEALQAEAJAAANIgCAHQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgFAEgGACIgOADIgNABQgLABgLgFgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgFgCgIAAQgOAAgJAJg");
	this.shape_187.setTransform(-229.75,20.6);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#373535").s().p("AgJA9Igxh5IARAAQABAAAAAAQABAAABABQAAAAAAAAQABAAAAABIADADIAfBNIADARIAFgRIAfhNIACgDIAEgCIARAAIgxB5g");
	this.shape_188.setTransform(-241.825,20.575);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgEgMgBgPQAAgMAFgMQADgJAIgKQAGgHAMgFQAKgFANAAQALAAAJAEQAJAEAHAHQAGAGAEALQADAJAAANQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhRAAQACAMACAIQACAHAGAHQAFAGAGADQAJACAHAAQAIAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgFAEgHACIgNADIgNABQgMABgLgFgAgTglQgJAJgCAQIBBAAQgBgJgBgFQgDgGgEgFQgDgEgGgDQgGgCgHAAQgOAAgJAJg");
	this.shape_189.setTransform(-254,20.6);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgJAGgNAAQgJAAgKgEgAgVgGQgKAKAAAXQAAAJACALQACAJAEAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_190.setTransform(-267.425,17.925);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgLAAgQQAAgMAEgNQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgKALAAAWQAAALADAJQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_191.setTransform(-285.475,17.925);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#373535").s().p("AAeA9IAAhMQgBgOgGgHQgGgIgNAAQgIABgJAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAGAAAAAEIABAOQAIgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQACAIAAALIAABMg");
	this.shape_192.setTransform(-298.25,20.5);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHIgJAGIgKAEIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_193.setTransform(-311.325,20.575);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_194.setTransform(-328.375,20.5);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEAMAAANQAAAOgEAMQgEALgIAIQgHAJgLAEQgLAEgNAAQgMABgLgFgAgPgqQgHAEgEAFQgFAGgCAIQgCAJAAAKQAAAMACAHQACAJAFAFQAEAGAHADQAHADAIAAQASAAAJgMQAIgMAAgVQAAgUgIgNQgJgMgSAAQgIAAgHADg");
	this.shape_195.setTransform(-341.85,20.6);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_196.setTransform(-351.575,17.9);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIACgIAAQgOABgHgJg");
	this.shape_197.setTransform(-359.175,18.7);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgHgEIgMgBQgIAAgGADQgGACgGAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgHALgNAEQgLAEgOAAQgKABgKgFg");
	this.shape_198.setTransform(-369.025,20.6);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgIABgJAEQgJAFgGAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAIAEQAHADAFAGQAFAGADAIQADAKAAAJIAABMg");
	this.shape_199.setTransform(-381.375,20.5);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#373535").s().p("AgbA7QgIgEgFgGQgFgHgCgHQgDgJABgKIAAhNIAVAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_200.setTransform(-395,20.675);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgEgCQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgMQAAgLADgHQADgIAGgGQAFgGAGgDQAHgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgJAAQgGAAgEABQgFACgDAEQgDACgDAGQgBAGAAAHIAAALIAjAAIAAAPIgjAAIAABng");
	this.shape_201.setTransform(-405.5,17.95);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQAAAAABAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgFQgEgFgFgCQgHgCgGAAQgPAAgJAJg");
	this.shape_202.setTransform(-420.575,20.6);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAIgIAJgFQAKgFALAAQAKAAAHADQAJAFAEAFQAFAFADAJQACAIAAAKIAABNg");
	this.shape_203.setTransform(-433.35,17.825);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAGgBIAEgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIACgIAAQgOABgHgJg");
	this.shape_204.setTransform(-444.675,18.7);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAEgIAIIAABYIgVAAIAAh4IANAAQAEAAACAEIABAOQAIgJAKgFQAJgFANgBQAKAAAIAEQAHADAFAGQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_205.setTransform(443.55,-8.3);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADQACADABACIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_206.setTransform(433.675,-10.9);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgDgLgBgQQABgMADgNQADgKAIgJQAGgJAKgEQAKgFAMAAQAKAAAIAEQAHADAIAHIAAhDIAUAAIAACvIgMAAQgEAAgCgEIgBgPQgJAKgJAFQgKAGgNAAQgJAAgKgEgAgVgGQgJAKAAAXQAAAJACALQABAJAEAFQAFAGAGACQAEADAIAAQAKAAAIgFQAIgFAHgIIAAg6QgGgIgIgDQgHgEgIAAQgQAAgJANg");
	this.shape_207.setTransform(418.75,-10.875);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgJgJgDgLQgFgMABgPQAAgMADgMQAEgJAHgKQAIgHAKgFQALgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgDAFgHAEQgFAEgGACIgNADIgOABQgLABgKgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgDgFQgFgEgFgDQgGgCgHAAQgOAAgKAJg");
	this.shape_208.setTransform(406.2,-8.2);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBIAFACIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgHAFQgDACgCADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_209.setTransform(394.625,-8.2);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#373535").s().p("AgaA7QgIgEgFgGQgFgGgDgIQgDgIAAgLIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAIAAAJgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_210.setTransform(382.725,-8.125);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#373535").s().p("AgZA7QgIgEgJgHIAFgIIACgDIAEgBQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgCgDQgDgDgFgCIgKgFIgWgIIgKgFQgEgDgDgGQgDgFAAgJQAAgHADgGQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEIgKgBQgFAAgEABIgHAFQgEACgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgFAFgJAEQgJACgKAAQgNAAgKgDg");
	this.shape_211.setTransform(366.225,-8.2);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_212.setTransform(354.625,-8.3);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAOAAAKAFQAKAEAIAIQAIAIAEAMQAEAMAAANQAAAOgEAMQgEALgIAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAHACAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_213.setTransform(341.15,-8.2);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_214.setTransform(331.425,-10.9);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAIAJAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQAEADAGAAIAFgBIAFgCIADgBIACgBQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_215.setTransform(323.825,-10.1);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgGgIgFgMQgEgNAAgNQAAgMAEgMQAEgMAHgIQAHgIALgFQAKgFANAAQAOAAAJAFQAIACAJAJIgGAIIgCACIgCAAIgEgBIgGgDIgHgEQgFgBgHAAQgIAAgGADQgGACgGAIQgEAFgDAJQgCAJAAAJQAAALACAIQACAIAFAHQAEAFAHAEQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgHAKgMAFQgMAFgOgBQgKABgKgFg");
	this.shape_216.setTransform(313.975,-8.2);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#373535").s().p("AgaA7QgJgEgFgGQgFgHgCgHQgCgHgBgMIAAhNIAVAAIAABNQAAANAHAIQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgHgDg");
	this.shape_217.setTransform(301.35,-8.125);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAGgMAJgIQAKgHALAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgEAMIAABMg");
	this.shape_218.setTransform(290.6,-8.325);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAEgCIAEgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgIgJg");
	this.shape_219.setTransform(280.675,-10.1);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAHACAFABQAGgBAEgCIAIgDIAFgHIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgCgGgDQgFgBgFgEQgFgDgDgGQgCgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAGgDALAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgHAAQgEAAgEABIgIAFQgDACgBADQgCADAAAEQAAAFADADIAHAFIAgAMIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgFAFgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_220.setTransform(270.875,-8.2);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAKAAAJIAABMg");
	this.shape_221.setTransform(259.25,-8.3);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_222.setTransform(249.375,-10.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgFAFgCAJQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_223.setTransform(236.275,-8.2);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_224.setTransform(227.375,-10.9);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgHAHgGACQgIACgIAAQgOABgHgJg");
	this.shape_225.setTransform(219.825,-10.1);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#373535").s().p("AgSA6QgJgDgJgKQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQAMgFALAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgFQgEgFgFgCQgHgCgGAAQgPAAgJAJg");
	this.shape_226.setTransform(209.025,-8.2);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgHABgJAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIACAOQAHgIAKgGQAKgFAMgBQAKAAAHAEQAJAEAEAFQAFAGADAIQADAKAAAJIAABMg");
	this.shape_227.setTransform(196.25,-8.3);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgIgJgEgLQgFgMABgPQAAgMADgMQAEgJAHgKQAIgHALgFQAKgFAMAAQAMAAAIAEQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBABQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAHQAGAGAHADQAIACAGAAQAJAAAFgBIAKgEQAEgCADgDIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgFAEQgGAEgGACIgNADIgOABQgLABgKgFgAgTglQgJAJgDAQIBCAAQAAgJgDgFQgCgGgDgFQgFgEgFgDQgHgCgGAAQgPAAgIAJg");
	this.shape_228.setTransform(183.1,-8.2);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#373535").s().p("AgZBRQgMgDgFgEQgIgFgCgFQgEgGAAgGQAAgJAGgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEABgBIAGgFIAGgFQgIgEgGgJQgFgIAAgLQAAgKAEgHQADgHAGgFQAHgGAHgCQAJgDAKAAQAHAAAHACQAHACAFADIAhAAIAAAIQABAEgGABIgNACQADAIAAAKQABAJgEAHQgDAHgGAFQgHAGgIACQgJADgIAAQgKAAgGgCQgDACgDADQgCABAAAEQAAAEADACQAFADAFABIAbABIAPABQAGABAHADQAGAEADAFQAEAFAAAJQAAAIgFAHQgDAIgHAFQgKAHgJACQgKAEgNAAQgMAAgKgDgAghAmQgEAEAAAHQAAAEADADQABADAFAEQAEACAHACQAGABAJAAQAIAAAGgBQAIgCAEgDQADgCAEgFQADgFAAgEQAAgEgDgDQgCgDgFgCIgKgCIgXgBQgGAAgHgBQgFACgGAGgAgXg9QgHAHAAALQAAAGACAEQACAFADADQAEADAEACQAHACAFAAQADAAAIgCIAIgFIAFgIQABgEAAgGQAAgLgHgHQgGgGgMAAQgNAAgHAGg");
	this.shape_229.setTransform(170.85,-6.125);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#373535").s().p("AgZA7QgIgEgJgHIAFgIIACgDIAEgBIAEACIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgCgDQgDgDgFgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgHAFQgEACgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEADAFQACAGAAAHQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_230.setTransform(154.625,-8.2);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_231.setTransform(143.025,-8.3);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_232.setTransform(133.175,-10.9);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgHAAgHQAAgHAEgHQAEgHAJgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgHgHQgFgHgMAAQgIAAgEACIgJAEIgIAEQgCACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBgBgDIgCgLIgJAHIgKAGIgJAEIgNABQgIAAgFgCgAABAIIgPAFQgGADgEAEQgCAFAAAFQgBAFACADQABAEADACQADACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgLABg");
	this.shape_233.setTransform(123.8,-8.225);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgOAAIgEgBIgBgEIAAgIIATgCIAGgmIABgDQAAAAABgBQAAAAABAAQAAAAABAAQAAgBAAAAIALAAIAAArIAiAAIAAAPIgiAAIAABIQAAAIADAEQAEADAFAAIAHgBIADgCIAEgBIACgBQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgNABgJgJg");
	this.shape_234.setTransform(113.4,-10.1);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#373535").s().p("AAdA9IAAhMQABgOgHgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgVAAIAAh4IAMAAQAEAAACAEIACAOQAGgIAMgGQAJgFAMgBQAKAAAHAEQAJAEAFAFQAFAIACAGQACAIABALIAABMg");
	this.shape_235.setTransform(102.4,-8.3);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#373535").s().p("AgWA6QgLgEgIgJQgIgIgEgLQgEgMAAgOQAAgNAEgMQAFgMAHgIQAIgIALgEQAJgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEALAAAOQAAAPgEALQgEALgHAIQgIAJgKAEQgMAFgNgBQgMABgKgFgAgPgqQgGAEgFAFQgEAGgDAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAIACAHAAQATAAAIgMQAJgMAAgVQAAgUgJgNQgIgMgTAAQgHAAgIADg");
	this.shape_236.setTransform(88.9,-8.2);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_237.setTransform(76.875,-8.2);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIAAgIIAUgCIAFgmQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAIADgCIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgCIADgBIACgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABIAGAJQgGAGgHADQgIACgIAAQgOABgHgJg");
	this.shape_238.setTransform(61.925,-10.1);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAJgFAOgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgFACIgJAEIgHAEQgCACgDAAIgEgBIgCgDIgEgGQAKgKALgFQAMgFAOAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAIAAAKIAABNIgJAAIgGgBQgCgBAAgDIgDgLIgJAHQgEAEgGACIgKAEIgMABQgHAAgGgCgAABAIQgJADgGACQgGADgEAEQgDAFAAAFQABAFABADQACAEADACQACACADABIAIABIAKgBIAJgDIAPgMIAAgZQgPAAgLABg");
	this.shape_239.setTransform(51.2,-8.225);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgHAKgGQAKgFALAAQAKAAAHADQAJAEAEAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_240.setTransform(38.775,-10.975);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgEIAAgIIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAAAIAKAAIAAArIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgCIADgBIACgBQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABABIAGAJQgHAGgGADQgIACgIAAQgOABgHgJg");
	this.shape_241.setTransform(27.475,-10.1);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgNAAgOQAAgNAEgMQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgHAKgLAFQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAHgEAHgJIAAg6QgGgIgHgDQgIgEgHAAQgQAAgJANg");
	this.shape_242.setTransform(11.175,-10.875);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_243.setTransform(1.875,-10.9);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAIgJQAHgIAKgFQAMgFAMAAQANAAAKAFQAJADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgFAFgCAJQgCAHAAALQAAALACAIQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_244.setTransform(-6.575,-8.2);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_245.setTransform(-18.675,-8.225);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgGADgFAHQgFAGgCAIQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_246.setTransform(-34.575,-8.2);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_247.setTransform(-43.475,-10.9);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgMQgFgMAAgPQAAgMAEgMQAEgKAIgJQAGgHALgFQALgFAMAAQAMAAAIAEQAJADAHAIQAHAGAEALQAEAKAAAMIgBAHQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAFQAFAGAHADQAHACAHAAQAIAAAGgBIARgJIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHIgJAJIgMAGIgNADIgOABQgLABgLgFgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgFQgEgEgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_248.setTransform(-52.875,-8.2);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#373535").s().p("AgKBYIAAivIAUAAIAACvg");
	this.shape_249.setTransform(-62.2,-10.975);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgHAKIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKADAFQAGAGAGADQAFADAIAAQAGAAAHgCIAJgEIAFgFQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABABQABAAAAAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_250.setTransform(-70.675,-8.2);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#373535").s().p("AgaA7QgJgFgEgFQgFgFgDgJQgDgJAAgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAHgEAIgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgJAKgJAFQgJAFgMAAQgKAAgHgDg");
	this.shape_251.setTransform(-83.3,-8.125);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgHgIgNAAQgIABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAEAAACAEIABAOQAIgIAKgGQAKgFAMgBQAKAAAIAEQAIAEAEAFQAEAGAEAIQACAKAAAJIAABMg");
	this.shape_252.setTransform(-96.35,-8.3);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHADAGAGQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgKAHIgJAGIgKAEIgNABQgHAAgGgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_253.setTransform(-114.075,-8.225);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgIIACgDIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGABQAGgBAEgCIAIgDQADgDACgEIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgDAKAAQANAAAJAEQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgDIgIgEQgEgBgGAAQgFAAgEABIgIAFQgDACgBADQgCADAAAEQAAAEADAEIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAJgDAGQgDAHgGAFQgGAFgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_254.setTransform(-129.925,-8.2);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGQABgCACgDIAFgDQADgBACAAIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_255.setTransform(-138.075,-10.9);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#373535").s().p("AgTBpIgCgCIgBgDIABgCIABgCQAMgXAHgXQAFgaAAgYQAAgagFgXQgGgXgNgXIgCgEIABgDIACgCIAKgGQAIAOAGAOQAHAPADAMQAEAPACANQACAMAAAPQAAAQgCANQgCALgEAQQgDAMgHAPQgGAOgIAOg");
	this.shape_256.setTransform(-149.825,-9.675);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgDgBAAgDIgQgpIhNAAIgQApIgDAEQgBACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgghVg");
	this.shape_257.setTransform(-161.125,-10.725);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABCFIgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_258.setTransform(-178.375,-10.725);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_259.setTransform(-195.975,-10.725);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#373535").s().p("AgEBTQgHgPgDgMIgGgbQgCgOAAgPQAAgOACgNQACgOAEgOQADgMAHgPQAGgOAIgOIAKAGIACACIABADIgCAEQgMAXgHAXQgFAXAAAaQAAAbAFAXQAHAXAMAXIABACIABACIgBADIgCACIgKAGQgIgOgGgOg");
	this.shape_260.setTransform(-208.825,-9.675);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgDgLgBgQQAAgOAEgLQAEgKAGgJQAHgJAKgEQAKgFAMAAQAKAAAIAEQAHADAIAHIAAhDIAUAAIAACvIgMAAQgEAAgCgEIgCgPQgIAKgKAFQgKAGgLAAQgKAAgKgEgAgVgGQgKALABAWQAAANABAHQACAJAFAFQADAGAHACQAEADAIAAQAKAAAIgFQAIgFAHgIIAAg6QgGgIgIgDQgIgEgHAAQgQAAgJANg");
	this.shape_261.setTransform(-224.55,-10.875);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgBACAAIAGABIAFADQACADABACIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_262.setTransform(-233.825,-10.9);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgFAIIgCACIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKAEAFQAEAGAHADQAFADAIAAQAGAAAHgCIAJgEIAFgFIAEgBQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_263.setTransform(-242.325,-8.2);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgKAEIgGAEQgDACgDAAIgDgBIgDgDIgEgGQALgLALgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgJAAIgGgBQgBgBgBgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAFACADQABAEACACQACACAFABIAIABIAJgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_264.setTransform(-254.4,-8.225);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#373535").s().p("AgQA6QgJgDgIgJQgHgKgEgKQgEgMAAgOQAAgMAEgMQAEgMAHgIQAIgIAKgFQAKgFANAAQAOAAAJAFQAKADAHAIIgHAKIgDAAIgEgBIgFgDIgIgEQgFgBgHAAQgIAAgGADQgHADgFAHQgFAGgCAIQgCAJAAAJQAAALACAIQAEAKADAFQAFAGAHADQAFADAIAAQAGAAAHgCIAIgEIAGgFQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAIAGAHQgIALgLAEQgMAFgNgBQgLABgKgFg");
	this.shape_265.setTransform(-270.325,-8.2);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#373535").s().p("AgKBXIAAh4IAUAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBIAGABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_266.setTransform(-279.175,-10.9);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgMQgFgMABgPQAAgNADgLQAEgLAHgIQAIgHAKgFQALgFAMAAQALAAAJAEQAKAEAGAHQAHAGAEALQAEAJAAANIgBAHQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAFQAGAGAHADQAHACAHAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgCAEgIAFQgEAEgIACIgMADIgOABQgLABgLgFgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgFQgGgFgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_267.setTransform(-288.6,-8.2);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_268.setTransform(-297.925,-10.975);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgNAAgNQAAgNADgLQAEgLAHgJQAIgIAKgFQAMgFAMAAQAOAAAIAFQAKADAIAIIgGAIIgCACIgCAAIgEgBIgGgDIgIgEQgEgBgHAAQgJAAgGADQgFACgGAIQgEAEgDAKQgCAHAAALQAAANACAGQACAIAFAHQAFAGAGADQAGADAIAAQAHAAAGgCQAFgBADgDIAGgFIAEgBQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAIAGAHQgIALgMAEQgMAFgNgBQgKABgKgFg");
	this.shape_269.setTransform(-306.375,-8.2);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#373535").s().p("AgaA7QgJgEgEgGQgFgGgDgIQgDgIAAgLIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAJAAAIgFQAJgEAGgIIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgKAAgHgDg");
	this.shape_270.setTransform(-319.025,-8.125);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#373535").s().p("AAdA9IAAhMQAAgOgGgHQgGgIgNAAQgJABgIAEQgIAFgHAHIAABYIgWAAIAAh4IANAAQAFAAABAEIACAOQAGgIALgGQAKgFAMgBQAKAAAHAEQAIADAFAGQAFAGADAIQADAJAAAKIAABMg");
	this.shape_271.setTransform(-332.075,-8.3);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#373535").s().p("AgXA6QgLgEgIgJQgHgIgEgLQgEgLAAgPQAAgOAEgLQAEgMAHgIQAJgIAKgEQAJgFAOAAQAPAAAJAFQAKAEAIAIQAHAIAFAMQAEANAAAMQAAANgEANQgEALgIAIQgHAJgLAEQgLAFgNgBQgMABgLgFgAgPgqQgGAEgFAFQgFAGgCAIQgCAJAAAKQAAAMACAHQADAJAEAFQAFAGAGAEQAHACAIAAQASAAAJgMQAJgLAAgWQAAgVgJgMQgJgMgSAAQgIAAgHADg");
	this.shape_272.setTransform(-345.55,-8.2);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#373535").s().p("AgSBVQgHgEgHgJIgBALQgBAEgFAAIgNAAIAAivIAVAAIAABIQAIgJAJgFQAJgFAMAAQAMAAAIAEQAHAEAHAIQAFAHAEAMQADALABAPQAAAOgEALQgEALgGAJQgHAJgKAEQgKAFgMAAQgKAAgJgEgAgRgNQgJAGgFAHIAAA6QAGAIAGADQAHAEAJAAQAQAAAJgNQAKgMgBgWQAAgNgBgHQgDgIgEgFQgEgGgGgCQgEgDgIAAQgJAAgJAFg");
	this.shape_273.setTransform(-358.45,-10.875);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#373535").s().p("AgKBXIAAh4IAVAAIAAB4gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgBQAEAAACABIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_274.setTransform(-368.725,-10.9);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAHgMAIgIQAJgHAMAAIAKABIAHAEIgDAQQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgJAHgDAMIAABMg");
	this.shape_275.setTransform(-376,-8.325);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#373535").s().p("AgfBRIAXgwIgzhyIATAAQAAAAABABQABAAAAAAQABAAAAAAQABABAAAAIADADIAgBMIACAKIAEgKIAfhMIADgDIAEgCIARAAIhDCdIgDAEQgBACgEgBg");
	this.shape_276.setTransform(-387.625,-6.15);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#373535").s().p("AAkA9IgDgBIgDgDIgegwIgCAGIgcAqIgDADIgEABIgTAAIArg9Igqg8IAVAAIAEABIACADIAdAtIADgGIAagnIADgDIACgBIAUAAIgoA7IAqA+g");
	this.shape_277.setTransform(-399.8,-8.225);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgNAFgHQAIgIALgEQAJgFAOAAQAOAAAKAFQALAEAIAIQAGAHAFANQAEANAAAMQAAANgEANQgFAMgGAHQgIAJgLAEQgLAFgNgBQgNABgKgFgAgPgqQgGAEgFAFQgEAFgDAJQgCALAAAIQAAAJACAKQADAKAEAEQAFAGAGAEQAHACAIAAQASAAAJgMQAJgMAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_278.setTransform(-411.8,-8.2);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgMQgFgMAAgPQABgMAEgMQAEgLAGgIQAIgHAKgFQALgFAMAAQALAAAKAEQAJAEAHAHQAGAGAEALQAEAJgBANQAAAGgBABQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAJACALQADAIAGAGQAFAGAGADQAJACAGAAQAIAAAGgBIAKgEIAHgFIAFgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIAGAHQgEAFgGAEQgEAEgHACIgOADIgMABQgLABgMgFgAgUglQgJAJgBAQIBAAAQAAgGgCgIQgBgGgFgFQgEgFgGgCQgGgCgGAAQgOAAgKAJg");
	this.shape_279.setTransform(-424.8,-8.2);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_280.setTransform(-439.575,-10.725);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#373535").s().p("AgFAOIgFgEIgDgEIgBgGIABgFIADgEIAFgEIAFgBIAFABIAGAEQACABAAADIACAFIgCAGQAAADgCABIgGAEIgFABg");
	this.shape_281.setTransform(-116,-43.25);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAgBgBQAAAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgDAEQgCACgCAAIgSAAIBEirIAXAAIBFCrgAgfAWIA/AAIgbhFQgDgFgCgLg");
	this.shape_282.setTransform(-126.7,-50.525);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABAGIAAB/IgVAAIAAirIAMAAIAFABIADADIBjCBIgBgGIAAh/IAVAAIAACrg");
	this.shape_283.setTransform(-143.975,-50.525);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#373535").s().p("AArBWQgGAAgDgFIgsg9IgFgFIgHgBIgSAAIAABIIgWAAIAAirIAwAAQAQAAALADQAMAEAIAGQAIAHAEAIQADAIAAAMQAAAJgDAIQgDAJgFAFQgFAGgJAEQgHAEgLACQAFADADAFIAzBEgAgogCIAZAAQAJAAAIgCQAIgCAFgFQAFgFACgGQADgGABgIQAAgPgLgIQgKgIgTAAIgaAAg");
	this.shape_284.setTransform(-159.8,-50.525);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgGgIgEgLQgDgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAVAAIAACvIgNAAQgDAAgCgEIgCgPQgHAKgLAFQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAEAFQAEAGAGACQAFADAIAAQAKAAAIgFQAGgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgQAAgIANg");
	this.shape_285.setTransform(-180.3,-50.675);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgIABgJAEQgJAFgGAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAFAFADAJQADAJAAAKIAABNg");
	this.shape_286.setTransform(-193.075,-48.1);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAEgHAJgFQAIgFAPgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACIgJAEIgHAEQgCACgEAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFANAAQALAAAHAEQAJADAFAGQAFAFADAKQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgEAEQgCAFAAAFQgBAFACADQABAEADACQADACADABIAIABIAJgBIAJgDIAQgMIAAgZQgPAAgKABg");
	this.shape_287.setTransform(-206.15,-48.025);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgCAEQgCACgEAAIgSAAIBFirIAXAAIBFCrgAgCg2IgdBMIA/AAIgghVg");
	this.shape_288.setTransform(-224.825,-50.525);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABAGIAAB/IgVAAIAAirIAMAAIAFABIADADIBjCBIgBiFIAVAAIAACrg");
	this.shape_289.setTransform(-242.075,-50.525);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_290.setTransform(-259.675,-50.525);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#373535").s().p("AgLBIQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIABgEIAIgJIADgGIABgHIgBAAIgFgBIgFgEIgCgEIgBgGIABgFIACgFIAFgCIAFgBIAGABIAFADIADAGIABAHQgBAFgBAGQgCAGgDAFQgBAFgGAGIgIAKgAgFgtIgFgEIgDgFIgBgGIABgFIADgFIAFgDIAFgBIAGABIAEADQADABABAEIABAFIgBAGQgBADgDACIgEAEIgGABg");
	this.shape_291.setTransform(-276.85,-46.2);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_292.setTransform(-282.975,-50.775);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQADgGAJgGQAKgFAOgDQAPgDATAAIAAgKQAAgNgGgIQgGgHgMAAQgIAAgFACIgJAEIgGAEQgCACgEAAIgDgBIgEgDIgDgGQAKgKALgFQAMgFANAAQALAAAHAEQAIACAGAHQAFAFADAKQADAIAAAKIAABNIgPgBQgCgCgBgCIgBgLIgKAHIgJAGIgLAEIgMABQgIAAgFgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADQABAEADACQADACAEABIAIABIAJgBIAJgDIAPgMIAAgZQgPAAgKABg");
	this.shape_293.setTransform(-292.3,-48.025);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_294.setTransform(-301.275,-50.7);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACIACAEIABATQAHgMAJgIQAIgHAMAAIAJABQAFACADACIgDAQQAAAAAAABQAAABgBAAQAAAAgBABQgBAAAAAAIgGgCIgJgBQgMAAgGAHQgIAGgFANIAABMg");
	this.shape_295.setTransform(-308.575,-48.125);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgMQgEgNAAgOQAAgOAEgLQAFgLAHgIQAGgIAMgEQAKgEAMgBQAMABAJADQAJAEAGAHQAHAGAEALQADAJABANIgBAIQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgEIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDADgGAFQgGAEgHACIgMAEIgOABQgMgBgKgEgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgDgGgDgEQgFgFgFgDQgHgCgHAAQgOAAgIAJg");
	this.shape_296.setTransform(-320.35,-48);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAQAFAAABgBIAFgBIADgCIACgCQAAAAAAABQABAAAAAAQABAAAAABQAAAAABABIAGAKQgHAFgGADQgIADgIAAQgOAAgIgJg");
	this.shape_297.setTransform(-331.075,-49.9);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgIAEgGQAEgGAJgGQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgEgBIgCgDIgEgGQALgLALgEQAKgFAPAAQAKAAAIAEQAIADAFAGQAFAFADAKQADAJAAAJIAABNIgKAAIgFgBQgCgCAAgCIgDgLIgJAHQgEAEgGACQgDACgGACIgNABQgIAAgFgCgAACAIQgLADgFACQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAHABIAKgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_298.setTransform(-341.825,-48.025);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#373535").s().p("AA9A+IAAhNQAAgOgGgHQgGgIgMAAQgGABgEABIgJAGQgEADgBAGQgDAGAAAGIAABNIgUAAIAAhNQAAgOgGgHQgFgIgMAAQgJAAgGAEQgFAEgHAIIAABaIgVAAIAAh5IAMAAQAFAAABAFIACAMQAHgIAIgFQAIgGALAAQAMABAIAGQAHAGADANQACgHAFgFQADgDAGgEQAEgDAHgDIAMgBQAJAAAIADQAIAEAFAFQAEAFAEAJQACAKAAAKIAABNg");
	this.shape_299.setTransform(-357.425,-48.1);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgIgIgDgMQgEgKAAgQQAAgOADgKQAEgLAHgJQAIgJAKgEQALgEANgBQAOAAAIAFQAKAEAIAHIgGAIIgCACIgDAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIgGgEIgIgDQgEgBgHAAQgJAAgGADQgGADgFAGQgFAIgCAHQgDAJAAAJQAAALADAIQACAJAFAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgFIAEgBQAAAAABAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgIAKgMAEQgMAEgNABQgKgBgKgEg");
	this.shape_300.setTransform(-377.425,-48);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAIAGACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_301.setTransform(-386.325,-50.7);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgOAAIgEgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmIABgDQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAKAAIAAAqIAiAAIAAAPIgiAAIAABIQAAAIADAEQAEADAGAAQAEAAACgBIAEgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAFgHADQgIADgIAAQgNAAgIgJg");
	this.shape_302.setTransform(-393.925,-49.9);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#373535").s().p("AgRA6QgKgDgJgKQgHgIgFgLQgFgNABgOQAAgMADgNQAEgJAHgKQAIgIAKgEQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgBACQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQABAMADAIQACAHAFAIQAGAFAHADQAIADAGgBQAJABAFgCIAKgFQAEgBADgDIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDAEgHAEQgFAEgGACIgNAEIgOABQgLgBgKgEgAgUglQgIAJgDAQIBCAAQgBgJgCgFQgCgGgDgEQgFgFgFgDQgGgCgHAAQgOAAgKAJg");
	this.shape_303.setTransform(-404.7,-48);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgGgHgOgBQgHABgJAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHADQAIAEAFAGQAEAFAEAJQADAJAAAKIAABNg");
	this.shape_304.setTransform(-417.45,-48.1);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgHgFgMQgEgNAAgOQAAgOAEgLQAFgLAHgIQAGgIAMgEQAKgEAMgBQAMABAJADQAJAEAGAHQAGAFAFAMQADAJABANIgBAIQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMAEAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgEIAFgBQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDADgGAFQgGAEgHACIgMAEIgOABQgMgBgKgEgAgTglQgKAJgCAQIBCAAQAAgGgCgIQgDgGgDgEQgFgFgFgDQgHgCgHAAQgOAAgIAJg");
	this.shape_305.setTransform(-430.6,-48);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#373535").s().p("AgaBRQgLgDgFgEQgGgEgEgGQgDgGAAgGQAAgJAFgHQAHgGAJgEQgGgCgCgEQgDgEAAgHIABgFQABgEACgBIAEgFIAHgFQgJgEgFgJQgFgJAAgKQAAgIADgJQAFgIAFgEQAIgGAHgCQAIgDAKAAQAIAAAGACQAIACAEADIAhAAIAAAIQAAAEgFABIgNACQAEAIAAAKQAAAJgEAHQgEAIgFAEQgGAFgJADQgIADgJAAQgJAAgHgCQgEACgCADQgCABAAAEQAAAEAEACQADADAGABIAbABIAPABQAHABAGADQAFADAEAGQAEAGAAAIQAAAHgEAIQgEAGgHAHQgKAHgIACQgKAEgNAAQgMAAgMgDgAggAmQgFAEAAAHQAAADACAEQACAEAFADQAFADAGABQAHABAIAAQAIAAAHgBQAHgCAEgDQAFgDACgEQADgDAAgGQAAgFgDgCQgCgDgEgCIgKgCIgYgBQgGAAgGgBQgHADgEAFgAgXg9QgGAHAAALQAAAGABAEIAFAIQAFAEAEABQAHACAEAAQAEAAAHgCQAEgCAEgDQADgDACgFQACgEAAgGQAAgLgHgHQgHgGgMAAQgNAAgHAGg");
	this.shape_306.setTransform(-442.875,-45.925);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgDQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgHAGgHQAFgGAGgDQAHgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgJAAQgGAAgEACQgFABgDADQgDADgDAGQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_307.setTransform(404.4,-79.45);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#373535").s().p("AgXA6QgKgEgJgJQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgOAFgGQAKgJAJgDQAJgFAOAAQAOAAAKAFQALADAHAJQAHAGAFAOQAEANAAAMQAAANgEANQgFAMgHAHQgHAJgLAEQgLAEgNAAQgNAAgKgEgAgPgqQgGADgFAGQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_308.setTransform(393.6,-76.8);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgLgDQgFgBgGgEQgFgBgFgEQgFgEgCgFQgDgGAAgIQAAgGADgHQADgIAFgDQAFgFAJgDQAHgCAKgBQANABAJADQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgHAAQgEAAgEABIgIAEQgDADgBADQgCADAAAEQAAAFADADIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgFAEgJAEQgIACgLAAQgOAAgJgDg");
	this.shape_309.setTransform(376.975,-76.8);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#373535").s().p("AgZBVQgKgEgFgIQgGgHgEgMQgCgLAAgQQgBgOAEgLQAEgKAGgJQAIgJAJgEQAJgFANAAQAJAAAJAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgIAKgKAFQgKAGgLAAQgLAAgIgEgAgWgGQgJALAAAWQAAANACAHQACAJAEAFQAEAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgGgIgGgDQgJgEgIAAQgPAAgKANg");
	this.shape_310.setTransform(364.7,-79.475);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIABANQAHgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAEAFAEAJQACAJAAAKIAABNg");
	this.shape_311.setTransform(351.95,-76.9);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCIAGACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_312.setTransform(342.075,-79.5);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#373535").s().p("AAhBYQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAgBIgngyIgEgDIgFgBIgGAAIAAA6IgWAAIAAivIAWAAIAABnIAFAAIAEgBIAEgDIAlgoIAEgDQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAIAUAAIgwAyIgDADIADADIADAEIAwA8g");
	this.shape_313.setTransform(333.425,-79.575);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#373535").s().p("AgLBJQgIgIAAgOIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAJAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAHAEAFQAEADAGAAIAFgBIAFgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgGAGgHACQgIACgIAAQgOABgHgJg");
	this.shape_314.setTransform(317.275,-78.7);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgIAIIAABZIgVAAIAAh5IANAAQAEAAACAFIABANQAIgJAKgFQAJgGANAAQAKAAAIADQAHAEAFAGQAEAFAEAJQACAJAAAKIAABNg");
	this.shape_315.setTransform(306.3,-76.9);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgOADgLQAEgLAHgIQAHgIALgEQALgEAMgBQALABAJADQAKAEAGAHQAHAGAEALQADAJAAANIgBAIQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgHACIgOAEIgNAAQgLAAgLgEgAgUglQgJAJgCAQIBBAAQAAgGgCgIQgCgGgDgEQgFgGgGgCQgGgCgHAAQgOAAgJAJg");
	this.shape_316.setTransform(293.15,-76.8);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQADAAACACQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABIACATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgIAHgFAMIAABMg");
	this.shape_317.setTransform(282.7,-76.925);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgLQgFgNAAgOQABgMAEgNQAEgLAGgIQAIgIAKgEQALgEAMgBQALABAJADQAKAEAHAHQAGAGAEALQAEAJgBANQAAAGgBACQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhQAAQAAAJACALQADAHAFAIQAGAFAGADQAJADAGgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgGAEQgEAEgHACIgOAEIgMAAQgLAAgMgEgAgUglQgJAJgBAQIBAAAQAAgJgCgFQgBgGgFgEQgDgFgHgDQgGgCgGAAQgOAAgKAJg");
	this.shape_318.setTransform(270.9,-76.8);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgEgDQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgIAFgGQAGgGAHgDQAGgCALAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFACQgFABgDADQgDAEgCAFQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_319.setTransform(260.7,-79.45);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#373535").s().p("AgSBXIAAhmIgOgBIgDgDQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgLADgIQADgHAFgHQAGgGAHgDQAGgCALAAQAJAAAGACIgBALQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgEACQgFABgDADQgDADgDAGQgBAGAAAHIAAALIAjAAIAAAQIgjAAIAABmg");
	this.shape_320.setTransform(252.6,-79.45);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDQADgCACAAIAGACIAFADQACACABADIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_321.setTransform(245.425,-79.5);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#373535").s().p("AgaBVQgJgEgFgIQgFgHgEgMQgEgLAAgQQABgOADgLQADgKAIgJQAGgJAKgEQAKgFAMAAQAJAAAJAEQAIADAGAHIAAhDIAVAAIAACvIgMAAQgEAAgCgEIgCgPQgHAKgKAFQgLAGgMAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAHgFQAJgFAGgIIAAg6QgFgIgIgDQgIgEgIAAQgQAAgIANg");
	this.shape_322.setTransform(235.15,-79.475);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgHgEgMQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_323.setTransform(217.6,-76.8);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#373535").s().p("AAiA9QgEAAAAgEIgehdIgCAMIgbBRQgBAEgEAAIgQAAIgnh5IAQAAQABAAABAAQAAAAABABQAAAAABAAQAAAAABABIACADIAZBVIABAJIAfhfIACgDIAEgBIAIAAIAEABIACADIAcBWIABAIIAchdIACgDQABgBAAAAQAAAAABAAQAAgBABAAQABAAAAAAIAQAAIgnB5g");
	this.shape_324.setTransform(201.775,-76.825);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIAUgCIAEgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAHAAIAFgBIAFgBIADgCIACgCQAAAAABABQAAAAABAAQAAAAAAABQABAAAAABIAGAKQgHAGgGACQgIACgIAAQgOABgHgJg");
	this.shape_325.setTransform(188.075,-78.7);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgOADgLQAEgLAHgIQAIgIAKgEQALgEAMgBQALABAJADQAKAEAGAHQAHAGAEALQAEAJAAANIgCAIQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgIACIgMAEIgOAAQgLAAgLgEgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgEQgGgGgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_326.setTransform(172.65,-76.8);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABAAAAABIABATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgMAAgGAHQgHAGgFANIAABMg");
	this.shape_327.setTransform(162.2,-76.925);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAPgDATAAIAAgKQAAgOgGgHQgGgHgMAAQgHAAgFACQgFABgEADIgHAEQgDACgCAAIgFgBIgCgDIgEgGQALgLALgEQAKgFAPAAQAKAAAIAEQAIADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgCgBgBgDIgDgLIgJAHQgFAEgFACIgJAEIgNABQgIAAgFgCgAACAIIgQAFQgGAEgEADQgDAFABAFQgBAFACADQACAEADACQACACADABIAIABIAKgBIAIgDIAQgMIAAgZQgPAAgKABg");
	this.shape_328.setTransform(150.45,-76.825);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgIgIgEgLQgFgNABgOQAAgOADgLQAFgLAGgIQAIgIALgEQAKgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQADAJABANQAAAGgBACQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhQAAQAAAJADALQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgFAEQgGAEgGACIgNAEIgOAAQgLAAgLgEgAgTglQgKAJgCAQIBCAAQAAgGgDgIQgCgGgDgEQgGgGgEgCQgHgCgHAAQgOAAgIAJg");
	this.shape_329.setTransform(133.6,-76.8);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQAEAAABACQAAAAABABQAAAAAAABQAAAAAAABQABAAAAABIABATQAHgMAIgIQAJgHAMAAIAJABIAIAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAgBAAIgFgCIgKgBQgLAAgGAHQgIAHgFAMIAABMg");
	this.shape_330.setTransform(123.15,-76.925);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#373535").s().p("AgSA6QgKgDgIgKQgJgIgDgLQgFgNABgOQAAgMADgNQAEgLAHgIQAIgIAKgEQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAJAAANQAAAGgCACQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAIhRAAQABAMACAIQADAHAFAIQAGAFAGADQAJADAGgBQAIABAGgCIAKgFQAFgBACgCIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgDAEgHAEQgFAEgGACIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgBgGgFgEQgDgFgHgDQgFgCgHAAQgOAAgKAJg");
	this.shape_331.setTransform(111.35,-76.8);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgJAAgIAFQgIAEgHAIIAABYIgWAAIAAivIAWAAIAABHQAHgIAKgFQAJgFAMAAQAKAAAHADQAIAEAFAGQAFAGADAIQADAIAAAKIAABNg");
	this.shape_332.setTransform(98.575,-79.575);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#373535").s().p("AgLBWIAAiXIg3AAIAAgUICFAAIAAAUIg3AAIAACXg");
	this.shape_333.setTransform(84.675,-79.325);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#373535").s().p("AgFAOIgFgDIgDgFIgBgGIABgFIADgEIAFgEIAFgBIAGABIAEAEQACABACADIABAFIgBAGQgBADgDACIgEADIgGABg");
	this.shape_334.setTransform(70.45,-72.05);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#373535").s().p("AgaA9QgHgCgEgEQgFgEgCgGQgDgGAAgIQAAgHAEgHQAFgHAIgFQAKgFANgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgDgBIgDgDIgEgGQAMgLAKgEQALgFANAAQAMAAAGAEQAJADAFAGQAGAHACAIQADAIAAAKIAABNIgKAAIgEgBQgDgBAAgDIgCgLIgKAHQgFAEgEACIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgHAEgDADQgCAFAAAFQAAAEACAEQABAEACACIAGADIAIABIAKgBIAIgDIAJgGIAHgGIAAgZQgPAAgKABg");
	this.shape_335.setTransform(61.6,-76.825);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#373535").s().p("AgKBYIAAh5IAUAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCIAGACIAEADIAEAFIABAGIgBAGIgEAEIgEAEIgGABg");
	this.shape_336.setTransform(52.675,-79.5);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#373535").s().p("AgkA+IAAh5IAMAAQABAAABAAQABAAAAABQABAAAAAAQABAAAAABIACAEIABATQAHgMAJgIQAJgHALAAIAKABIAHAEIgDAQQAAAAAAABQgBABAAAAQgBAAAAABQgBAAAAAAIgGgCIgKgBQgLAAgGAHQgHAGgFANIAABMg");
	this.shape_337.setTransform(45.35,-76.925);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#373535").s().p("AgZBVQgKgFgFgHQgGgHgDgMQgEgLABgQQgBgOAEgLQAEgKAGgJQAIgJAJgEQAJgFANAAQAKAAAIAEQAIADAGAHIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgHAKgLAFQgJAGgMAAQgLAAgIgEgAgWgGQgIALgBAWQAAAJACALQADAJADAFQAFAGAFACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgFgIgHgDQgJgEgHAAQgQAAgKANg");
	this.shape_338.setTransform(32.7,-79.475);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#373535").s().p("AAdA+IAAhNQABgNgHgIQgGgHgOgBQgHABgJAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIAMgGQAJgGAMAAQAKAAAHADQAJAFAEAFQAEAFAEAJQADAJAAAKIAABNg");
	this.shape_339.setTransform(19.95,-76.9);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgHgEgMQgEgNAAgNQAAgMAEgNQAFgNAHgHQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEANAAAMQAAANgEANQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAIACAHAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgHAAgIADg");
	this.shape_340.setTransform(6.45,-76.8);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#373535").s().p("AAeBYIAAhNQAAgNgHgHQgGgIgNAAQgIAAgJAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAHgHAKgGQAKgFALAAQAKAAAHADQAJAEAFAGQAEAGADAIQACAHAAALIAABNg");
	this.shape_341.setTransform(-6.75,-79.575);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#373535").s().p("AgQA6QgKgEgHgIQgGgIgFgMQgEgKAAgQQAAgOADgKQAEgLAHgJQAIgJAKgEQALgEANgBQAOAAAIAFQAKAEAIAHIgGAIIgCACIgDABIgDgCIgGgEIgIgDQgEgBgHAAQgJAAgGADQgGADgFAGQgFAIgCAHQgCAIAAAKQAAAMACAHQACAJAFAGQAFAGAGADQAGADAIAAQAGAAAHgCIAIgEIAGgEIAEgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgIAKgMAEQgMAEgNAAQgKAAgKgEg");
	this.shape_342.setTransform(-18.925,-76.8);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#373535").s().p("AgXA6QgLgEgHgJQgIgIgDgLQgFgMAAgOQAAgNAFgMQADgMAIgIQAIgIAKgEQAKgFANAAQAOAAALAFQAJAEAJAIQAHAIAEAMQAEAKAAAPQAAAQgEAKQgEALgHAIQgIAJgKAEQgLAEgOAAQgLAAgMgEgAgPgqQgGAEgFAFQgEAFgDAKQgCAHAAALQAAALACAIQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_343.setTransform(-31.45,-76.8);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgBIADgCIACgCQAAAAABABQAAAAAAAAQABAAAAABQAAAAABABIAGAKQgHAGgGACQgIACgIAAQgOABgIgJg");
	this.shape_344.setTransform(-42.575,-78.7);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_345.setTransform(-50.125,-79.5);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#373535").s().p("AA9A+IAAhNQAAgPgGgGQgHgIgMAAQgFABgFABIgIAGIgFAJQgCAFAAAHIAABNIgVAAIAAhNQAAgOgGgHQgFgIgMAAQgJABgGADQgHAGgFAGIAABaIgWAAIAAh5IAOAAQAEAAABAFIACAMQAHgIAHgFQAJgGALAAQANABAHAGQAHAHADAMQABgFAGgHQAFgFAEgCQAFgEAGgCIAMgBQAJAAAIADQAHAEAFAFQAFAFADAKQADAIABALIAABNg");
	this.shape_346.setTransform(-62.9,-76.9);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#373535").s().p("AgSA6QgKgDgJgKQgHgIgFgLQgDgNAAgOQgBgOAEgLQAFgMAGgHQAIgIAKgEQALgEAMgBQALABAJADQAJADAHAIQAGAGAEALQAEAKABAMIgCAIQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQAAAMADAIQAEAJAEAGQAGAFAHADQAHADAHgBQAIABAGgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgCADgIAFQgEAEgIACIgMAEIgOAAQgMAAgKgEgAgUglQgJAJgCAQIBCAAQgBgGgCgIQgCgGgDgEQgGgGgEgCQgGgCgIAAQgOAAgJAJg");
	this.shape_347.setTransform(-83.85,-76.8);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#373535").s().p("AAeBYIAAhNQAAgMgHgIQgGgIgNAAQgIAAgJAFQgIAEgHAIIAABYIgVAAIAAivIAVAAIAABHQAHgHAKgGQAKgFALAAQAKAAAIADQAIAEAEAGQAGAHACAHQACAHAAALIAABNg");
	this.shape_348.setTransform(-96.65,-79.575);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#373535").s().p("AgMBJQgHgHAAgPIAAhKIgPAAIgDgBIgBgDIAAgJIATgCIAFgmIACgDQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAIAKAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAIAEAEQADADAGAAIAGgBIAFgBIADgCIACgCQAAAAABABQAAAAAAAAQABAAAAABQAAAAABABIAGAKQgHAGgGACQgIACgIAAQgOABgIgJg");
	this.shape_349.setTransform(-107.925,-78.7);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#373535").s().p("AgaBVQgJgFgFgHQgGgHgDgMQgEgNAAgOQAAgNAEgMQADgKAHgJQAHgJAKgEQAJgFANAAQAJAAAJAEQAJAEAFAGIAAhDIAWAAIAACvIgNAAQgFAAgBgEIgCgPQgJALgJAEQgJAGgNAAQgJAAgKgEgAgVgGQgJALAAAWQAAANACAHQABAJAFAFQADAGAGACQAFADAIAAQAKAAAIgFQAIgFAGgIIAAg6QgGgIgHgDQgIgEgHAAQgQAAgJANg");
	this.shape_350.setTransform(-124.225,-79.475);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgJABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAHADQAIAEAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_351.setTransform(-136.975,-76.9);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#373535").s().p("AgaA9QgGgCgFgEQgEgEgDgGQgDgHAAgHQAAgHAEgHQAEgGAJgGQAJgFAOgDQAQgDASAAIAAgKQAAgOgGgHQgGgHgMAAQgIAAgEACIgJAEIgHAEQgDACgDAAIgDgBIgDgDIgEgGQAKgKAMgFQALgFAOAAQAKAAAIAEQAHACAGAHQAFAFADAKQADAHAAALIAABNIgKAAIgFgBQgCgCAAgCIgCgLIgTANIgKAEIgNABQgHAAgGgCgAACAIIgQAFQgGADgDAEQgDAFAAAFQAAAFABADIAEAGQADACAEABIAIABIAJgBIAJgDIAIgGIAHgGIAAgZQgPAAgKABg");
	this.shape_352.setTransform(-150.075,-76.825);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBQABAAAAABQABAAABAAQAAAAABAAQAAABABAAIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgIAFgDQAFgFAJgDQAHgCAKgBQANABAJADQAJAEAHAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgGAAQgFAAgEABIgIAEQgDADgBADQgCADAAAEQAAAEADAEIAHAFQAFADAEABIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgGAEgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_353.setTransform(-165.925,-76.8);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#373535").s().p("AgbA7QgHgEgFgGQgFgFgDgJQgDgJAAgKIAAhNIAWAAIAABNQAAAOAGAHQAGAIANAAQAJAAAIgFQAJgFAGgHIAAhZIAWAAIAAB5IgNAAQgFAAgBgEIgCgOQgHAJgKAGQgKAFgMAAQgJAAgJgDg");
	this.shape_354.setTransform(-177.825,-76.725);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgLQgFgNAAgOQAAgMAEgNQAEgKAIgJQAGgHALgFQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAFgCADQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIhQAAQABAMADAIQADAJAFAGQAFAFAHADQAHADAHgBQAJABAFgCIAKgFIAHgDIAFgCQABAAAAAAQABAAAAAAQABABAAAAQABABAAAAIAGAIQgEAEgGAEQgFAEgGACIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgEQgEgFgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_355.setTransform(-190.675,-76.8);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#373535").s().p("AgKBYIAAivIAVAAIAACvg");
	this.shape_356.setTransform(-200.025,-79.575);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#373535").s().p("AgQA6QgJgEgIgIQgHgJgEgLQgEgLAAgPQAAgMAEgMQAEgMAHgIQAIgJAKgEQAKgEANgBQAOAAAJAFQAKAEAHAHIgGAIIgCACIgCABIgEgCIgFgEIgIgDQgFgBgHAAQgIAAgGADQgHADgFAGQgFAIgCAHQgCAJAAAJQAAAKACAJQAEALADAEQAFAGAHADQAFADAIAAQAGAAAHgCIAIgEIAGgEIAEgCQABAAABAAQAAAAABAAQABABAAAAQAAABAAAAIAGAIQgIAKgLAEQgMAEgNAAQgLAAgKgEg");
	this.shape_357.setTransform(-208.475,-76.8);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#373535").s().p("AgaA7QgJgFgEgFQgGgGgCgIQgCgJgBgKIAAhNIAWAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgFAAgBgEIgCgOQgIAKgKAFQgJAFgMAAQgKAAgHgDg");
	this.shape_358.setTransform(-221.1,-76.725);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#373535").s().p("AAdA+IAAhNQAAgNgGgIQgHgHgNgBQgIABgIAEQgIAEgIAIIAABZIgVAAIAAh5IANAAQAEAAACAFIABANQAIgJAKgFQAKgGAMAAQAKAAAIADQAIAFAEAFQAEAFAEAJQADAJgBAKIAABNg");
	this.shape_359.setTransform(-234.15,-76.9);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#373535").s().p("AgSA6QgKgEgIgJQgIgIgEgLQgFgNAAgOQAAgMAEgNQAEgKAIgJQAGgHALgFQALgEAMgBQAMABAIADQAKAEAGAHQAHAGAEALQAEAKAAAMQAAAFgCADQAAAAAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAIhPAAQAAAMADAIQADAJAFAGQAFAFAHADQAHADAHgBQAIABAGgCIARgIIAFgCQAAAAABAAQABAAAAAAQABABAAAAQABABAAAAIAGAIIgJAIIgMAGIgNAEIgOAAQgLAAgLgEgAgUglQgIAJgDAQIBBAAQAAgJgCgFQgCgGgEgEQgEgFgFgDQgHgCgGAAQgPAAgJAJg");
	this.shape_360.setTransform(-251.925,-76.8);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#373535").s().p("AAdBYIAAhNQAAgNgGgHQgGgIgNAAQgIAAgJAFQgHAEgJAIIAABYIgUAAIAAivIAUAAIAABHQAKgJAIgEQAKgFALAAQAKAAAHADQAIAEAFAGQAFAFADAJQACAIABAKIAABNg");
	this.shape_361.setTransform(-264.7,-79.575);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#373535").s().p("AgLBJQgIgHAAgPIAAhKIgPAAIgDgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAIAAgJIAUgCIAFgmQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIAJAAIAAAqIAjAAIAAAPIgjAAIAABIQAAAHAEAFQAEADAGAAIAGgBIAEgBIADgCIACgCQABAAAAABQAAAAABAAQAAAAABABQAAAAAAABIAGAKQgGAGgHACQgIACgIAAQgOABgHgJg");
	this.shape_362.setTransform(-276.025,-78.7);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgJABgIAEQgIAEgHAIIAABZIgWAAIAAh5IANAAQAFAAABAFIABANQAHgIALgGQAKgGAMAAQAKAAAHADQAJAFAEAFQAFAGADAIQADAJAAAKIAABNg");
	this.shape_363.setTransform(-291.625,-76.9);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGIADgFIAFgDIAFgCQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_364.setTransform(-301.525,-79.5);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#373535").s().p("AgZBVQgKgEgFgIQgHgIgDgLQgCgLAAgQQgBgOAEgLQAEgMAGgHQAIgJAJgEQAIgFAOAAQAJAAAJAEQAIAEAGAGIAAhDIAWAAIAACvIgOAAQgEAAgBgEIgCgPQgIAKgKAFQgKAGgMAAQgJAAgJgEgAgWgGQgIALgBAWQAAANADAHQACAJADAFQAEAGAGACQAFADAIAAQAKAAAIgFQAGgEAIgJIAAg6QgGgIgHgDQgIgEgIAAQgPAAgKANg");
	this.shape_365.setTransform(-316.4,-79.475);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#373535").s().p("AAdA+IAAhNQAAgOgGgHQgGgHgNgBQgIABgJAEQgJAFgGAHIAABZIgWAAIAAh5IANAAQAFAAABAFIACANQAGgIALgGQAKgGAMAAQAKAAAIADQAHAEAFAGQAFAGADAIQADAJAAAKIAABNg");
	this.shape_366.setTransform(-329.175,-76.9);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#373535").s().p("AgbA7QgIgEgFgGQgFgHgCgHQgDgJABgKIAAhNIAVAAIAABNQAAAOAGAHQAHAIAMAAQAJAAAIgFQAIgEAHgIIAAhZIAVAAIAAB5IgMAAQgEAAgCgEIgBgOQgJAKgJAFQgKAFgMAAQgKAAgIgDg");
	this.shape_367.setTransform(-342.8,-76.725);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#373535").s().p("AgXA6QgLgFgIgIQgGgHgFgMQgEgNAAgNQAAgMAEgNQAGgOAFgGQAIgIALgEQAJgFAOAAQAOAAAKAFQALADAIAJQAGAGAFAOQAEANAAAMQAAANgEANQgFAMgGAHQgIAJgLAEQgLAEgNAAQgNAAgKgEgAgPgqQgGADgFAGQgEAFgDAKQgCAKAAAIQAAAJACAKQADAKAEAFQAFAGAGADQAHACAIAAQASABAJgMQAJgNAAgVQAAgUgJgNQgJgMgSAAQgIAAgHADg");
	this.shape_368.setTransform(-356,-76.8);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#373535").s().p("AgSBXIAAhmIgNgBIgFgDQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBIAAgJIATAAIAAgLQAAgKADgJQACgHAHgHQAGgGAGgDQAGgCALAAQAJAAAGACIAAALQAAABgBAAQAAABAAAAQAAAAgBAAQAAABgBAAIgJAAQgFAAgFACQgFABgCADQgDADgCAGQgCAFAAAIIAAALIAjAAIAAAQIgiAAIAABmg");
	this.shape_369.setTransform(-366.65,-79.45);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#373535").s().p("AgZA7QgJgEgIgHIAFgJIACgCIADgBIAFACIAGAEIAIADQAGACAGAAQAGAAAEgCIAIgDQADgEACgDIABgIQAAgFgDgDQgBgDgGgCIgKgFIgWgIIgKgFQgFgEgCgFQgDgGAAgIQAAgGADgHQADgHAFgEQAFgFAJgDQAHgCAKgBQANABAJADQAKAEAGAHIgFAHQgBADgDAAIgEgBIgGgEIgIgDQgEgBgGAAQgFAAgEABIgIAEQgDADgBADQgCADAAAEQAAAEADAEQADADAEACIAJAEIAXAIIAKAFQAFAEACAFQADAFAAAIQAAAIgDAHQgDAHgGAGQgGAEgIAEQgIACgLAAQgNAAgKgDg");
	this.shape_370.setTransform(-380.725,-76.8);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#373535").s().p("AgKBYIAAh5IAVAAIAAB5gAgFg5IgFgEIgDgEIgBgGIABgGQABgDACgCIAFgDQADgCACAAQAEAAACACIAFADIADAFIABAGIgBAGIgDAEIgFAEIgGABg");
	this.shape_371.setTransform(-388.875,-79.5);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#373535").s().p("AA/BWQgEAAgBgCQgBAAAAgBQgBAAAAAAQgBgBAAgBQAAAAAAgBIgQgpIhNAAIgQApIgCAEQgCACgEAAIgSAAIBFirIAXAAIBFCrgAgfAWIA/AAIgghVg");
	this.shape_372.setTransform(-404.725,-79.325);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#373535").s().p("AA6BWIgFgBIgDgDIhjiBIABALIAAB6IgVAAIAAirIAMAAIAFABIADADIBjCBIgBiFIAVAAIAACrg");
	this.shape_373.setTransform(-421.975,-79.325);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#373535").s().p("AhKBWIAAirIBBAAQASAAAPAGQAQAGALAMQALALAGAQQAHARAAARQAAASgHARQgGAQgLALQgLAMgQAGQgPAGgSAAgAgyBDIApAAQANAAALgEQALgFAIgJQAIgIAEgNQAFgMAAgQQAAgOgFgNQgEgNgIgIQgIgJgLgFQgLgEgNAAIgpAAg");
	this.shape_374.setTransform(-439.575,-79.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448.6,-88.4,897.2,176.8);


(lib.Tween14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#373535").s().p("AgrESQgMgFgJgJQgJgJgEgLQgGgMAAgOQAAgNAGgMQAEgLAJgJQAJgJAMgEQAMgGAPAAQANAAALAGQAMAEAKAJQAIAJAFALQAFAMABANQgBAOgFAMQgFALgIAJQgKAJgMAFQgLAFgNgBQgPABgMgFgAg1BPIgIg8IAAgFIAAgEQgBgPAIgNQAIgMAMgKQAMgLAOgJQANgKAMgLQAMgLAIgNQAHgOAAgTQAAgWgOgOQgPgOgZAAQgUABgNAEQgOAEgJAFIgRAJQgHAFgHgBQgQAAgIgNIgegvQANgMARgLQAQgKATgIQASgHAWgEQAWgEAYgBQAjAAAcAKQAcAJAVARQATASAKAYQALAZAAAeQAAAdgHAVQgJAUgMAQQgMAPgOALIgcAVQgNAJgJAJQgJAKgDAKIgLA1g");
	this.shape.setTransform(221.4,1.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#373535").s().p("ACyERQgQAAgLgHQgKgIgFgMIgghfIjPAAIggBfQgDAKgMAJQgLAIgQAAIhjAAIDVohICAAAIDTIhgAgLh1IgMAhIgzCVICVAAIgziVIgLgiIgNgqIgLArg");
	this.shape_1.setTransform(179.75,1.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#373535").s().p("ACsERQgOAAgKgEQgLgFgJgMIkAlEIACAcIAAAZIAAEkIhwAAIAAohIBDAAIAOABQAFAAAGADQAEABAEAEIAKAKIEBFHIgCgeIgBgcIAAkgIBwAAIAAIhg");
	this.shape_2.setTransform(123.7,1.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#373535").s().p("Aj3ERIAAohIDUAAQA/AAA0AUQA0AVAmAlQAlAkAUAyQAVAyAAA6QAAA7gVAyQgUAyglAlQgmAkg0AVQg0AUg/AAgAh3CwIBUAAQAjAAAdgMQAdgNATgWQAUgXAKghQALggAAgpQAAgogLggQgKghgUgWQgTgXgdgNQgdgMgjAAIhUAAg");
	this.shape_3.setTransform(69,1.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#373535").s().p("AgzDFQgTgEgTgGQgTgHgQgJQgPgIgLgLIAagrQAGgHAGgEQAGgFALABQALgBAIAFIARAJQAKAGAMAEQANAFATAAQANAAAIgDQAKgCAFgFQAGgGADgFQACgHAAgGQAAgMgIgGQgHgJgNgFIgcgKIgigLQgQgFgQgJQgRgJgNgMQgNgMgHgTQgIgTAAgaQAAgZAJgXQALgWASgRQAUgQAdgLQAcgKAlABQAWAAAUADQATAFASAGQAQAHAPAJQAOAJALAMIgbAoQgEAHgFADQgFACgHAAQgJAAgIgDIgSgIIgVgHQgMgDgQgBQgVABgMAIQgMAIAAAQQAAAKAIAHQAHAIANAFIAcAKIAhALQARAGAQAIQARAIAMAMQANAKAIARQAHARAAAYQAAAdgLAZQgKAYgUARQgWASgeAJQgfAKgnAAQgTAAgUgDg");
	this.shape_4.setTransform(8.2,9.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#373535").s().p("Ag7EaIAAmEIB0AAIAAGEgAgbiWQgMgGgKgJQgJgJgGgMQgFgNAAgNQAAgPAFgMQAGgNAJgJQAKgJAMgGQANgFAOAAQAOAAANAFQAMAGAKAJQAKAJAGANQAFAMAAAPQAAANgFANQgGAMgKAJQgKAJgMAGQgNAFgOAAQgOAAgNgFg");
	this.shape_5.setTransform(-18.375,0.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#373535").s().p("AgSD2QgVgJgPgOQgOgPgIgVQgHgVAAgaIAAjIIghAAQgJAAgHgGQgGgFAAgLIAAgtIA+gMIAXhgQAEgSAVAAIA8AAIAAByIBfAAIAABPIhfAAIAADAQAAAOAHAIQAGAJAMAAQAHAAAEgBIAIgDIAGgDQACgCAEAAQAGAAADADQADACADAGIAkA3QgXARgcAIQgcAJgeAAQgcAAgUgIg");
	this.shape_6.setTransform(-58.525,4.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#373535").s().p("AhlDCQgVgHgQgNQgOgOgJgUQgIgUAAgbQAAgUAKgWQALgWAagSQAZgRAtgMQArgMBCAAIAAgQQAAgjgOgPQgOgPgaAAQgUAAgNAEQgNAFgKAFIgUAKQgKAFgNAAQgMAAgJgGQgJgGgEgIIgVglQAjgfArgPQArgPAwAAQAjAAAdALQAcALAUAVQATAUALAdQAKAcAAAhIAADyIg1AAQgQAAgJgFQgIgEgGgOIgJgVQgOAMgOAJQgNAKgPAGQgNAHgQADQgRADgTAAQgbAAgWgHgAAAAqQgWAFgNAGQgOAHgEAJQgFAJAAAKQAAAUAKAIQALAIAWAAQAVAAARgHQARgJARgRIAAg2QgjAAgWAFg");
	this.shape_7.setTransform(-94.5,9.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#373535").s().p("AA8EZIAAj3QAAgdgNgPQgNgQgaAAQgSAAgRAKQgRAJgPAPIAAERIh0AAIAAoxIB0AAIAADPQAVgSAZgLQAXgLAiAAQAgAAAZALQAYALARAUQARATAJAcQAIAaAAAgIAAD3g");
	this.shape_8.setTransform(-135.525,0.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373535").s().p("AByERIhnlNIgFgQIgFgUIgFAUIgFAQIhpFNIhyAAIipohIBqAAQARAAALAHQALAIAEANIBLEdIAHAeQAEAQACARIAIghIAJgeIBYkdQADgLAMgIQALgJAPAAIAlAAQAQAAALAHQALAIAEANIBYEdIAJAdIAIAfIAFgfIAHgdIBLkdQADgLALgJQAMgIAQAAIBjAAIipIhg");
	this.shape_9.setTransform(-197.8,1.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.9,-47,479.9,94.1);


(lib.Tween13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#373535").s().p("AgrESQgMgFgJgJQgJgJgEgLQgGgMAAgOQAAgNAGgMQAEgLAJgJQAJgJAMgEQAMgGAPAAQANAAALAGQAMAEAKAJQAIAJAFALQAFAMABANQgBAOgFAMQgFALgIAJQgKAJgMAFQgLAFgNgBQgPABgMgFgAg1BPIgIg8IAAgFIAAgEQgBgPAIgNQAIgMAMgKQAMgLAOgJQANgKAMgLQAMgLAIgNQAHgOAAgTQAAgWgOgOQgPgOgZAAQgUABgNAEQgOAEgJAFIgRAJQgHAFgHgBQgQAAgIgNIgegvQANgMARgLQAQgKATgIQASgHAWgEQAWgEAYgBQAjAAAcAKQAcAJAVARQATASAKAYQALAZAAAeQAAAdgHAVQgJAUgMAQQgMAPgOALIgcAVQgNAJgJAJQgJAKgDAKIgLA1g");
	this.shape.setTransform(221.4,1.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#373535").s().p("ACyERQgQAAgLgHQgKgIgFgMIgghfIjPAAIggBfQgDAKgMAJQgLAIgQAAIhjAAIDVohICAAAIDTIhgAgLh1IgMAhIgzCVICVAAIgziVIgLgiIgNgqIgLArg");
	this.shape_1.setTransform(179.75,1.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#373535").s().p("ACsERQgOAAgKgEQgLgFgJgMIkAlEIACAcIAAAZIAAEkIhwAAIAAohIBDAAIAOABQAFAAAGADQAEABAEAEIAKAKIEBFHIgCgeIgBgcIAAkgIBwAAIAAIhg");
	this.shape_2.setTransform(123.7,1.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#373535").s().p("Aj3ERIAAohIDUAAQA/AAA0AUQA0AVAmAlQAlAkAUAyQAVAyAAA6QAAA7gVAyQgUAyglAlQgmAkg0AVQg0AUg/AAgAh3CwIBUAAQAjAAAdgMQAdgNATgWQAUgXAKghQALggAAgpQAAgogLggQgKghgUgWQgTgXgdgNQgdgMgjAAIhUAAg");
	this.shape_3.setTransform(69,1.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#373535").s().p("AgzDFQgTgEgTgGQgTgHgQgJQgPgIgLgLIAagrQAGgHAGgEQAGgFALABQALgBAIAFIARAJQAKAGAMAEQANAFATAAQANAAAIgDQAKgCAFgFQAGgGADgFQACgHAAgGQAAgMgIgGQgHgJgNgFIgcgKIgigLQgQgFgQgJQgRgJgNgMQgNgMgHgTQgIgTAAgaQAAgZAJgXQALgWASgRQAUgQAdgLQAcgKAlABQAWAAAUADQATAFASAGQAQAHAPAJQAOAJALAMIgbAoQgEAHgFADQgFACgHAAQgJAAgIgDIgSgIIgVgHQgMgDgQgBQgVABgMAIQgMAIAAAQQAAAKAIAHQAHAIANAFIAcAKIAhALQARAGAQAIQARAIAMAMQANAKAIARQAHARAAAYQAAAdgLAZQgKAYgUARQgWASgeAJQgfAKgnAAQgTAAgUgDg");
	this.shape_4.setTransform(8.2,9.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#373535").s().p("Ag7EaIAAmEIB0AAIAAGEgAgbiWQgMgGgKgJQgJgJgGgMQgFgNAAgNQAAgPAFgMQAGgNAJgJQAKgJAMgGQANgFAOAAQAOAAANAFQAMAGAKAJQAKAJAGANQAFAMAAAPQAAANgFANQgGAMgKAJQgKAJgMAGQgNAFgOAAQgOAAgNgFg");
	this.shape_5.setTransform(-18.375,0.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#373535").s().p("AgSD2QgVgJgPgOQgOgPgIgVQgHgVAAgaIAAjIIghAAQgJAAgHgGQgGgFAAgLIAAgtIA+gMIAXhgQAEgSAVAAIA8AAIAAByIBfAAIAABPIhfAAIAADAQAAAOAHAIQAGAJAMAAQAHAAAEgBIAIgDIAGgDQACgCAEAAQAGAAADADQADACADAGIAkA3QgXARgcAIQgcAJgeAAQgcAAgUgIg");
	this.shape_6.setTransform(-58.525,4.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#373535").s().p("AhlDCQgVgHgQgNQgOgOgJgUQgIgUAAgbQAAgUAKgWQALgWAagSQAZgRAtgMQArgMBCAAIAAgQQAAgjgOgPQgOgPgaAAQgUAAgNAEQgNAFgKAFIgUAKQgKAFgNAAQgMAAgJgGQgJgGgEgIIgVglQAjgfArgPQArgPAwAAQAjAAAdALQAcALAUAVQATAUALAdQAKAcAAAhIAADyIg1AAQgQAAgJgFQgIgEgGgOIgJgVQgOAMgOAJQgNAKgPAGQgNAHgQADQgRADgTAAQgbAAgWgHgAAAAqQgWAFgNAGQgOAHgEAJQgFAJAAAKQAAAUAKAIQALAIAWAAQAVAAARgHQARgJARgRIAAg2QgjAAgWAFg");
	this.shape_7.setTransform(-94.5,9.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#373535").s().p("AA8EZIAAj3QAAgdgNgPQgNgQgaAAQgSAAgRAKQgRAJgPAPIAAERIh0AAIAAoxIB0AAIAADPQAVgSAZgLQAXgLAiAAQAgAAAZALQAYALARAUQARATAJAcQAIAaAAAgIAAD3g");
	this.shape_8.setTransform(-135.525,0.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#373535").s().p("AByERIhnlNIgFgQIgFgUIgFAUIgFAQIhpFNIhyAAIipohIBqAAQARAAALAHQALAIAEANIBLEdIAHAeQAEAQACARIAIghIAJgeIBYkdQADgLAMgIQALgJAPAAIAlAAQAQAAALAHQALAIAEANIBYEdIAJAdIAIAfIAFgfIAHgdIBLkdQADgLALgJQAMgIAQAAIBjAAIipIhg");
	this.shape_9.setTransform(-197.8,1.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.9,-47,479.9,94.1);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Image();
	this.instance.setTransform(-416.05,-294.25,0.5355,0.5355);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-416,-294.2,832.1,588.5);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Image();
	this.instance.setTransform(-416.05,-294.25,0.5355,0.5355);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-416,-294.2,832.1,588.5);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AjYVPQg8gYgsgrQgrgqgZg8Qgag7AAhCQAAhCAag7QAag7AqgpQAsgqA8gaQA7gZBHAAQBEAAA7AZQA7AZAtArQAuArAYA5QAZA7AABCQAABCgZA7QgYA6guAsQguArg6AYQg6AYhFAAQhHAAg7gYgAkJGJIgpkrIgCgWIgBgXQAAhQAng+QAmg9A8gzQA/g2BBgtQBDgvA9g3QA8g3AmhEQAohEAAhdQgBhwhJhCQhJhCiAAAQhiAAhCAVQhDAVgvAYIhTAuQgjAUgkAAQhQAAgmhEIiZjrQBFg5BRgzQBSgzBcglQBegmBpgVQBrgWB+AAQCtAACNAvQCNAvBhBWQBkBWA0B6QA1B5AACWQAACPgnBmQgnBng8BMQg8BMhJA3IiHBnQg+AvgyAvQgvAugMA6Ig0EEg");
	this.shape.setTransform(360.65,26.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ADfHlQgTAAgMgLQgNgKgIgbIicojQgKgkgFgcIgNBBQgKAmgJAbIiMHhQgOAwgwAAIjgAAIktvIIDoAAQAeAAAXAOQAXAOAEAWIBhGyQANA5AIAnQAJAsAIAxIAbhcQAPgsAOg1IB5mzQAGgVAWgPQAVgOAcAAICAAAQAfAAAWAOQAWAPAGAVICOITIAaBfQAIgyAKgrIB+oUQAEgWAWgOQAYgOAaAAIDdAAIktPIg");
	this.shape_1.setTransform(243.025,113.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjHHRQhdgkhBhAQhBhCglhcQgkhdAAhzQAAhzAkhcQAlhcBBhBQBBhABdgjQBagjBvAAQBvAABaAjQBaAiBBBBQBCBBAjBcQAkBcAABzQAABzgkBdQgjBdhCBBQhABBhbAjQhaAjhvAAQhvAAhagjgAiTjVQgxBGAACPQAACQAxBGQAvBHBmAAQBkAAAvhHQAwhHgBiPQABiPgwhGQgvhHhkAAQhmAAgvBHg");
	this.shape_2.setTransform(112.8,113.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ACWHsIAApnQAAhGghgoQghgog/AAQgvAAgqAUQgtAWgkAiIAAKxIkhAAIAAvIICzAAQAcAAARAMQATAMAHAZIARA4QAdgbAdgWQAggYAggOQAhgPAogJQAogJAuAAQBPAAA+AcQA9AbAqAxQArAyAVBDQAVBDAABQIAAJng");
	this.shape_3.setTransform(5.275,112.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ADYK8QghAAgYgLQgXgKgQgcIi2lXQgOgYgNgGQgPgHgbAAIg4AAIAAGtIkiAAIAA13IEiAAIAAMQIArAAQAbAAAPgIQAOgHANgUIC2kQQAPgXAXgMQAWgMAiAAIEJAAIj6FYQgTAZgUASQgWAUgXAOQAqAgAfA0IERHQg");
	this.shape_4.setTransform(-98.575,91.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Aj5HRQg9gbgrgzQgqgxgWhDQgVhDAAhQIAApnIEiAAIAAJmQAABIAhAnQAhAnA+AAQAvAAAqgTQAqgUAngjIAAqyIEiAAIAAPIIi0AAQg2ABgQgxIgSg5QgdAcgdAWQgfAWgiAPQgiAQgmAIQgoAJguAAQhQAAg8gbg");
	this.shape_5.setTransform(163.55,-25.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AjIHRQhbgkhChBQhChBgjhdQglhdAAhzQAAhzAlhcQAjhbBChBQBChBBbgjQBbghBvAAQBuAABbAhQBaAjBCBBQBBBBAjBbQAlBcAABzQAABzglBdQgjBdhBBBQhCBBhaAkQhbAihuAAQhvAAhbgigAiUjVQgvBGAACPQAACPAvBHQAwBHBmAAQBkAAAvhHQAvhHAAiPQAAiPgvhGQgvhHhkAAQhmAAgwBHg");
	this.shape_6.setTransform(56.075,-26.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ak4J/IC7mJImDtzIEAAAQAiAAASAPQATAPAIAUICfGiQAVA7APA5QAIgeALgdIAWg7ICPmgQAJgVAWgPQAWgOAZAAIDpAAIoFTEQgNAcgSAOQgTAOgpAAg");
	this.shape_7.setTransform(-46.5,-11.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Aj6KhQhBghguhAQgvg/gbhcQgbhdAAh1QAAhsAeheQAfhcA2hDQA3hEBNgnQBMgmBdABQBKgBA0AXQAzAWArAlIAAnuIEhAAIAAV3Ii0AAQgaAAgTgMQgSgMgHgZIgXhJQgdAeggAZQgfAagmASQgkASgqAKQgqALgygBQhMABhAgjgAgzhDQgiARgYAjQgZAigPA4QgNA5AABPQAABMALA0QALA0AUAiQAUAfAcAOQAcAPAjAAQAfAAAagGQAZgHAWgLQAVgLATgRQATgQAUgYIAAmZQgiglgngPQglgOgqAAQgnAAgiAPg");
	this.shape_8.setTransform(-191.425,-47.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiTK+IAAvIIEhAAIAAPIgAhEl5QgfgNgYgXQgXgWgOgfQgOgfAAghQAAgkAOggQAOgeAXgYQAYgXAfgOQAfgNAkABQAjgBAgANQAgAOAZAXQAYAYAOAeQAOAgAAAkQAAAhgOAfQgOAfgYAWQgZAXggANQggAPgjAAQgkAAgfgPg");
	this.shape_9.setTransform(-268.675,-48.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AppKpIAA1RIIQAAQCfAACBAzQCDA0BdBbQBcBaAzB9QA0B9AACSQAACTg0B9QgzB9hcBbQhdBbiDAzQiBAzifAAgAkrG2IDSAAQBaAABIgeQBGgfAxg5QAxg4AbhSQAahQAAhmQAAhkgahRQgbhSgxg5Qgxg4hGgfQhIgehaAAIjSAAg");
	this.shape_10.setTransform(-361.3,-46.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.3,-164.4,872.7,328.9);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AjYVPQg8gYgsgrQgrgqgZg8Qgag7AAhCQAAhCAag7QAag7AqgpQAsgqA8gaQA7gZBHAAQBEAAA7AZQA7AZAtArQAuArAYA5QAZA7AABCQAABCgZA7QgYA6guAsQguArg6AYQg6AYhFAAQhHAAg7gYgAkJGJIgpkrIgCgWIgBgXQAAhQAng+QAmg9A8gzQA/g2BBgtQBDgvA9g3QA8g3AmhEQAohEAAhdQgBhwhJhCQhJhCiAAAQhiAAhCAVQhDAVgvAYIhTAuQgjAUgkAAQhQAAgmhEIiZjrQBFg5BRgzQBSgzBcglQBegmBpgVQBrgWB+AAQCtAACNAvQCNAvBhBWQBkBWA0B6QA1B5AACWQAACPgnBmQgnBng8BMQg8BMhJA3IiHBnQg+AvgyAvQgvAugMA6Ig0EEg");
	this.shape.setTransform(360.65,26.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0)").s().p("ADfHlQgTAAgMgLQgNgKgIgbIicojQgKgkgFgcIgNBBQgKAmgJAbIiMHhQgOAwgwAAIjgAAIktvIIDoAAQAeAAAXAOQAXAOAEAWIBhGyQANA5AIAnQAJAsAIAxIAbhcQAPgsAOg1IB5mzQAGgVAWgPQAVgOAcAAICAAAQAfAAAWAOQAWAPAGAVICOITIAaBfQAIgyAKgrIB+oUQAEgWAWgOQAYgOAaAAIDdAAIktPIg");
	this.shape_1.setTransform(243.025,113.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0)").s().p("AjHHRQhdgkhBhAQhBhCglhcQgkhdAAhzQAAhzAkhcQAlhcBBhBQBBhABdgjQBagjBvAAQBvAABaAjQBaAiBBBBQBCBBAjBcQAkBcAABzQAABzgkBdQgjBdhCBBQhABBhbAjQhaAjhvAAQhvAAhagjgAiTjVQgxBGAACPQAACQAxBGQAvBHBmAAQBkAAAvhHQAwhHgBiPQABiPgwhGQgvhHhkAAQhmAAgvBHg");
	this.shape_2.setTransform(112.8,113.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0)").s().p("ACWHsIAApnQAAhGghgoQghgog/AAQgvAAgqAUQgtAWgkAiIAAKxIkhAAIAAvIICzAAQAcAAARAMQATAMAHAZIARA4QAdgbAdgWQAggYAggOQAhgPAogJQAogJAuAAQBPAAA+AcQA9AbAqAxQArAyAVBDQAVBDAABQIAAJng");
	this.shape_3.setTransform(5.275,112.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0)").s().p("ADYK8QghAAgYgLQgXgKgQgcIi2lXQgOgYgNgGQgPgHgbAAIg4AAIAAGtIkiAAIAA13IEiAAIAAMQIArAAQAbAAAPgIQAOgHANgUIC2kQQAPgXAXgMQAWgMAiAAIEJAAIj6FYQgTAZgUASQgWAUgXAOQAqAgAfA0IERHQg");
	this.shape_4.setTransform(-98.575,91.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Aj5HRQg9gbgrgzQgqgxgWhDQgVhDAAhQIAApnIEiAAIAAJmQAABIAhAnQAhAnA+AAQAvAAAqgTQAqgUAngjIAAqyIEiAAIAAPIIi0AAQg2ABgQgxIgSg5QgdAcgdAWQgfAWgiAPQgiAQgmAIQgoAJguAAQhQAAg8gbg");
	this.shape_5.setTransform(163.55,-25.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AjIHRQhbgkhChBQhChBgjhdQglhdAAhzQAAhzAlhcQAjhbBChBQBChBBbgjQBbghBvAAQBuAABbAhQBaAjBCBBQBBBBAjBbQAlBcAABzQAABzglBdQgjBdhBBBQhCBBhaAkQhbAihuAAQhvAAhbgigAiUjVQgvBGAACPQAACPAvBHQAwBHBmAAQBkAAAvhHQAvhHAAiPQAAiPgvhGQgvhHhkAAQhmAAgwBHg");
	this.shape_6.setTransform(56.075,-26.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ak4J/IC7mJImDtzIEAAAQAiAAASAPQATAPAIAUICfGiQAVA7APA5QAIgeALgdIAWg7ICPmgQAJgVAWgPQAWgOAZAAIDpAAIoFTEQgNAcgSAOQgTAOgpAAg");
	this.shape_7.setTransform(-46.5,-11.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Aj6KhQhBghguhAQgvg/gbhcQgbhdAAh1QAAhsAeheQAfhcA2hDQA3hEBNgnQBMgmBdABQBKgBA0AXQAzAWArAlIAAnuIEhAAIAAV3Ii0AAQgaAAgTgMQgSgMgHgZIgXhJQgdAeggAZQgfAagmASQgkASgqAKQgqALgygBQhMABhAgjgAgzhDQgiARgYAjQgZAigPA4QgNA5AABPQAABMALA0QALA0AUAiQAUAfAcAOQAcAPAjAAQAfAAAagGQAZgHAWgLQAVgLATgRQATgQAUgYIAAmZQgiglgngPQglgOgqAAQgnAAgiAPg");
	this.shape_8.setTransform(-191.425,-47.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiTK+IAAvIIEhAAIAAPIgAhEl5QgfgNgYgXQgXgWgOgfQgOgfAAghQAAgkAOggQAOgeAXgYQAYgXAfgOQAfgNAkABQAjgBAgANQAgAOAZAXQAYAYAOAeQAOAgAAAkQAAAhgOAfQgOAfgYAWQgZAXggANQggAPgjAAQgkAAgfgPg");
	this.shape_9.setTransform(-268.675,-48.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AppKpIAA1RIIQAAQCfAACBAzQCDA0BdBbQBcBaAzB9QA0B9AACSQAACTg0B9QgzB9hcBbQhdBbiDAzQiBAzifAAgAkrG2IDSAAQBaAABIgeQBGgfAxg5QAxg4AbhSQAahQAAhmQAAhkgahRQgbhSgxg5Qgxg4hGgfQhIgehaAAIjSAAg");
	this.shape_10.setTransform(-361.3,-46.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.3,-164.4,872.7,328.9);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AjYVPQg8gYgsgrQgrgqgZg8Qgag7AAhCQAAhCAag7QAag7AqgpQAsgqA8gaQA7gZBHAAQBEAAA7AZQA7AZAtArQAuArAYA5QAZA7AABCQAABCgZA7QgYA6guAsQguArg6AYQg6AYhFAAQhHAAg7gYgAkJGJIgpkrIgCgWIgBgXQAAhQAng+QAmg9A8gzQA/g2BBgtQBDgvA9g3QA8g3AmhEQAohEAAhdQgBhwhJhCQhJhCiAAAQhiAAhCAVQhDAVgvAYIhTAuQgjAUgkAAQhQAAgmhEIiZjrQBFg5BRgzQBSgzBcglQBegmBpgVQBrgWB+AAQCtAACNAvQCNAvBhBWQBkBWA0B6QA1B5AACWQAACPgnBmQgnBng8BMQg8BMhJA3IiHBnQg+AvgyAvQgvAugMA6Ig0EEg");
	this.shape.setTransform(360.65,26.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0)").s().p("ADfHlQgTAAgMgLQgNgKgIgbIicojQgKgkgFgcIgNBBQgKAmgJAbIiMHhQgOAwgwAAIjgAAIktvIIDoAAQAeAAAXAOQAXAOAEAWIBhGyQANA5AIAnQAJAsAIAxIAbhcQAPgsAOg1IB5mzQAGgVAWgPQAVgOAcAAICAAAQAfAAAWAOQAWAPAGAVICOITIAaBfQAIgyAKgrIB+oUQAEgWAWgOQAYgOAaAAIDdAAIktPIg");
	this.shape_1.setTransform(243.025,113.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0)").s().p("AjHHRQhdgkhBhAQhBhCglhcQgkhdAAhzQAAhzAkhcQAlhcBBhBQBBhABdgjQBagjBvAAQBvAABaAjQBaAiBBBBQBCBBAjBcQAkBcAABzQAABzgkBdQgjBdhCBBQhABBhbAjQhaAjhvAAQhvAAhagjgAiTjVQgxBGAACPQAACQAxBGQAvBHBmAAQBkAAAvhHQAwhHgBiPQABiPgwhGQgvhHhkAAQhmAAgvBHg");
	this.shape_2.setTransform(112.8,113.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0)").s().p("ACWHsIAApnQAAhGghgoQghgog/AAQgvAAgqAUQgtAWgkAiIAAKxIkhAAIAAvIICzAAQAcAAARAMQATAMAHAZIARA4QAdgbAdgWQAggYAggOQAhgPAogJQAogJAuAAQBPAAA+AcQA9AbAqAxQArAyAVBDQAVBDAABQIAAJng");
	this.shape_3.setTransform(5.275,112.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0)").s().p("ADYK8QghAAgYgLQgXgKgQgcIi2lXQgOgYgNgGQgPgHgbAAIg4AAIAAGtIkiAAIAA13IEiAAIAAMQIArAAQAbAAAPgIQAOgHANgUIC2kQQAPgXAXgMQAWgMAiAAIEJAAIj6FYQgTAZgUASQgWAUgXAOQAqAgAfA0IERHQg");
	this.shape_4.setTransform(-98.575,91.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0)").s().p("Aj5HRQg9gbgrgzQgqgxgWhDQgVhDAAhQIAApnIEiAAIAAJmQAABIAhAnQAhAnA+AAQAvAAAqgTQAqgUAngjIAAqyIEiAAIAAPIIi0AAQg2ABgQgxIgSg5QgdAcgdAWQgfAWgiAPQgiAQgmAIQgoAJguAAQhQAAg8gbg");
	this.shape_5.setTransform(163.55,-25.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0)").s().p("AjIHRQhbgkhChBQhChBgjhdQglhdAAhzQAAhzAlhcQAjhbBChBQBChBBbgjQBbghBvAAQBuAABbAhQBaAjBCBBQBBBBAjBbQAlBcAABzQAABzglBdQgjBdhBBBQhCBBhaAkQhbAihuAAQhvAAhbgigAiUjVQgvBGAACPQAACPAvBHQAwBHBmAAQBkAAAvhHQAvhHAAiPQAAiPgvhGQgvhHhkAAQhmAAgwBHg");
	this.shape_6.setTransform(56.075,-26.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0)").s().p("Ak4J/IC7mJImDtzIEAAAQAiAAASAPQATAPAIAUICfGiQAVA7APA5QAIgeALgdIAWg7ICPmgQAJgVAWgPQAWgOAZAAIDpAAIoFTEQgNAcgSAOQgTAOgpAAg");
	this.shape_7.setTransform(-46.5,-11.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0)").s().p("Aj6KhQhBghguhAQgvg/gbhcQgbhdAAh1QAAhsAeheQAfhcA2hDQA3hEBNgnQBMgmBdABQBKgBA0AXQAzAWArAlIAAnuIEhAAIAAV3Ii0AAQgaAAgTgMQgSgMgHgZIgXhJQgdAeggAZQgfAagmASQgkASgqAKQgqALgygBQhMABhAgjgAgzhDQgiARgYAjQgZAigPA4QgNA5AABPQAABMALA0QALA0AUAiQAUAfAcAOQAcAPAjAAQAfAAAagGQAZgHAWgLQAVgLATgRQATgQAUgYIAAmZQgiglgngPQglgOgqAAQgnAAgiAPg");
	this.shape_8.setTransform(-191.425,-47.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0)").s().p("AiTK+IAAvIIEhAAIAAPIgAhEl5QgfgNgYgXQgXgWgOgfQgOgfAAghQAAgkAOggQAOgeAXgYQAYgXAfgOQAfgNAkABQAjgBAgANQAgAOAZAXQAYAYAOAeQAOAgAAAkQAAAhgOAfQgOAfgYAWQgZAXggANQggAPgjAAQgkAAgfgPg");
	this.shape_9.setTransform(-268.675,-48.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0)").s().p("AppKpIAA1RIIQAAQCfAACBAzQCDA0BdBbQBcBaAzB9QA0B9AACSQAACTg0B9QgzB9hcBbQhdBbiDAzQiBAzifAAgAkrG2IDSAAQBaAABIgeQBGgfAxg5QAxg4AbhSQAahQAAhmQAAhkgahRQgbhSgxg5Qgxg4hGgfQhIgehaAAIjSAAg");
	this.shape_10.setTransform(-361.3,-46.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.3,-164.4,872.7,328.9);


(lib.The_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhOB6IAAjzICdAAIAAArIhkAAIAAA5IBMAAIAAApIhMAAIAAA7IBkAAIAAArg");
	this.shape.setTransform(54.375,12.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAxB6IAAhnIhiAAIAABnIg5AAIAAjzIA5AAIAABmIBiAAIAAhmIA6AAIAADzg");
	this.shape_1.setTransform(31.85,12.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgcB6IAAjGIhEAAIAAgtIDBAAIAAAtIhEAAIAADGg");
	this.shape_2.setTransform(9.75,12.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,62.3,24.5);


(lib.shadow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#181615","#92928C"],[0,1],0,0,0,0,0,417.1).s().p("EgtqAtqQy7y6AA6wQAA6vS7y7QS7y7avAAQawAAS6S7QS8S7AAavQAAawy8S6Qy6S86wAAQ6vAAy7y8g");
	this.shape.setTransform(413.35,413.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,826.7,826.7);


(lib.Rewind = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Arrow
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,187,191,0.498)").s().p("AgLGrQhUgBg7gWQg4gVgwguQgcgbgTgeQgWgigOgqQgLgggGg1QgEgjgBgQQABgkAIgkQAIgkAPggQAOghASgWQAUgYAVgJQAQgHAXgBQgYATgTAjQgSAjgKAsQgKAtABAvQABAzAOAsQAeBhBLAwQBEAsBlgBQA7AAA2gXQA1gXAogoQApgpAWg1QAXg3AAg7QAAgygRgvQgRgugegmQgfgmgpgbQgpgagwgMIBaBaIh2AAIiKiLICKiLIB2AAIhmBmQAuAHAsATQBDAcA0A0QA0A0AcBEQAeBFAABMQAABMgeBGQgcBDg0A0Qg8A8g7AZQhGAehHAAIgFAAg");
	this.shape.setTransform(37.225,42.6766);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2998C2").s().p("AgLGrQhUgBg7gWQg4gVgwguQgcgbgTgeQgWgigOgqQgLgggGg1QgEgjgBgQQABgkAIgkQAIgkAPggQAOghASgWQAUgYAVgJQAQgHAXgBQgYATgTAjQgSAjgKAsQgKAtABAvQABAzAOAsQAeBhBLAwQBEAsBlgBQA7AAA2gXQA1gXAogoQApgpAWg1QAXg3AAg7QAAgygRgvQgRgugegmQgfgmgpgbQgpgagwgMIBaBaIh2AAIiKiLICKiLIB2AAIhmBmQAuAHAsATQBDAcA0A0QA0A0AcBEQAeBFAABMQAABMgeBGQgcBDg0A0Qg8A8g7AZQhGAehHAAIgFAAg");
	this.shape_1.setTransform(37.225,42.6766);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgLGrQhUgBg7gWQg4gVgwguQgcgbgTgeQgWgigOgqQgLgggGg1QgEgjgBgQQABgkAIgkQAIgkAPggQAOghASgWQAUgYAVgJQAQgHAXgBQgYATgTAjQgSAjgKAsQgKAtABAvQABAzAOAsQAeBhBLAwQBEAsBlgBQA7AAA2gXQA1gXAogoQApgpAWg1QAXg3AAg7QAAgygRgvQgRgugegmQgfgmgpgbQgpgagwgMIBaBaIh2AAIiKiLICKiLIB2AAIhmBmQAuAHAsATQBDAcA0A0QA0A0AcBEQAeBFAABMQAABMgeBGQgcBDg0A0Qg8A8g7AZQhGAehHAAIgFAAg");
	this.shape_2.setTransform(37.225,42.6766);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},1).wait(1));

	// R
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAFCLIAAhyIgPABIAABxIgKAAIAAhwIgRAEIAABsIgJAAIAAhoQgLAEgGAGIAABeIgyAAIAAkVIBbAAQAdAAAVAGQAVAGAOALQAOALAFAPQAHAPAAASQgBAOgDAMQgDAMgIAKQgHAJgLAIQgKAIgNAGQAGADAGAFQAFAEAEAHIA8Bhg");
	this.shape_3.setTransform(38.4,49.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Al9G6IAAtyIL7AAIAANyg");
	this.shape_4.setTransform(38.425,43.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},1).wait(1));

	// Pulse
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#EE3249","rgba(255,255,255,0)"],[0.471,1],0,0,0,0,0,36.4).s().p("AiMFPQhCgcgygyQgygygchCQgdhDAAhKQAAhJAdhEQAchBAygyQAygyBCgcQBDgdBJAAQBKAABEAdQBBAcAyAyQAzAyAbBBQAdBEAABJQAABKgdBDQgbBCgzAyQgyAyhBAcQhEAdhKAAQhJAAhDgdg");
	this.shape_5.setTransform(36.375,48.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["#00BBBF","rgba(255,255,255,0)"],[0.471,1],0,0,0,0,0,36.4).s().p("AiMFPQhCgcgygyQgygygchCQgdhDAAhKQAAhJAdhEQAchBAygyQAygyBCgcQBDgdBJAAQBKAABEAdQBBAcAyAyQAzAyAbBBQAdBEAABJQAABKgdBDQgbBCgzAyQgyAyhBAcQhEAdhKAAQhJAAhDgdg");
	this.shape_6.setTransform(36.375,48.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.rf(["#0294C0","rgba(255,255,255,0)"],[0.471,1],0,0,0,0,0,36.4).s().p("AiMFPQhCgcgygyQgygygchCQgdhDAAhKQAAhJAdhEQAchBAygyQAygyBCgcQBDgdBJAAQBKAABEAdQBBAcAyAyQAzAyAbBBQAdBEAABJQAABKgdBDQgbBCgzAyQgyAyhBAcQhEAdhKAAQhJAAhDgdg");
	this.shape_7.setTransform(36.375,48.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AiMFPQhCgcgygyQgygygchCQgdhDAAhKQAAhJAdhEQAchBAygyQAygyBCgcQBDgdBJAAQBKAABEAdQBBAcAyAyQAzAyAbBBQAdBEAABJQAABKgdBDQgbBCgzAyQgyAyhBAcQhEAdhKAAQhJAAhDgdg");
	this.shape_8.setTransform(36.375,48.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5}]}).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.5,76.6,88.3);


(lib.Red_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AIhLyIAA3jIJKAAQCwAACQA5QCQA5BnBkQBmBkA5CLQA4CKAACiQAACkg4CKQg5CLhmBjQhmBliRA5QiQA4iwAAgAOBHlIDqAAQBlAABOgiQBPghA2g/QA3g/AchZQAdhZAAhyQAAhwgdhZQgchZg3hAQg3g+hOgiQhOgihlAAIjqAAgApULyIAA3jIPKAAIAAENIpqAAIAAFgIHYAAIAAECInYAAIAAFnIJqAAIAAENgAz0LyIAAprQgyACgoAFIAAJkIg1AAIAApcQgwAIgqAMIAAJIIg0AAIAAo1Qg6AaggAeIAAH9IkNAAIAA3jIHqAAQCjAAB0AiQB0AhBJA9QBJA7AhBSQAhBTAABfQAABKgUBBQgTBBgnA4QgnA2g5ArQg2ArhLAdQAjASAeAaQAeAYAYAnIFBIMgA4eBPQiBA9ABBbQgBATAGASQAahOB7gxQB9gxC1gBIAAhIQjJABiDA7gA4egbQiBA8ABBcQgBASAGASQAahOB7gxQB9gwC1AAIAAhIQjJAAiDA7gA5DmjQg3AyABBOQgBBQA3AxQA3AzBVAAQBVAAA4gzQA2gxAAhQQAAhOg2gyQg4gzhVAAQhVAAg3Azg");
	this.shape.setTransform(191.3,75.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,382.6,150.8);


(lib.queMark = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,187,191,0.498)").s().p("EgNNBSwQjqhjiqijQipiqhkjiQhjjjAAkGQAAkGBjjjQBkjbCpiqQCqiiDqhkQDphjEVAAQEFAADqBjQDpBkCxCiQCqCqBjDbQBjDjAAEGQAAEGhjDjQhjDiiqCqQixCjjpBjQjqBckFAAQkVAAjphcgAwMYAIicyPIgOhWIAAhcQAAk+CUjpQCdjxDijGQDqjNENi4QEMi4DpjVQDqjUCUkGQCdkNgBlpQAAmwkikGQkbj/n2AAQl+AAkGBOQj/BVi4BcQi4BjiOBOQiGBViOAAQk4AAiUkNIpTuSQENjiE4jHQE/i/FoiUQFqiVGhhVQGihVHpAAQKmAAIiC5QIoCxF+FTQF+FNDOHbQDNHZAAJFQAAIviVGNQicGTjpEqQjqEpkbDVIoMGTQj/C5i4C2Qi4C4grDcIjNP7g");
	this.shape.setTransform(324.5,904.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.queMark, new cjs.Rectangle(0,0,643.7,1744), null);


(lib.Of_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhhA/IAAh9IAjAAIAABPIAyAAIAAhCIAiAAIAABCIBMAAIAAAug");
	this.shape.setTransform(10.025,6.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgnBfQgTgIgNgNQgNgOgIgSQgHgTAAgXQAAgWAHgTQAIgTANgNQANgNAUgIQARgHAVAAQAVAAATAHQATAIAMANQAOANAHATQAIASAAAXQAAAYgIASQgHATgOANQgMANgTAIQgTAHgVAAQgUAAgTgHgAgagzQgMAFgHAGQgJAHgDALQgFAKAAAMQAAAOAFAJQADALAJAHQAHAHAMAEQAOAEAMAAQAOAAAMgEQAMgEAIgHQAHgHAGgLQADgKAAgNQAAgMgDgKQgGgLgHgHQgIgHgMgEQgKgDgQAAQgOAAgMADg");
	this.shape_1.setTransform(10.05,25.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20.1,35.3);


(lib.Knowledge_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiNDdIAAm5IEbAAIAABPIi0AAIAABnICKAAIAABLIiKAAIAABpIC0AAIAABPg");
	this.shape.setTransform(360.975,22.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag+DQQgqgRgdgeQgfgfgRgoQgRgsAAguQAAgwARgqQAQgpAfgeQAdgeAsgRQArgRA1AAQAbABAZAEQAZAFATAIQAUAHASALQASAMAMAMIgeAtQgEAHgGADQgFAEgIgBQgJAAgKgFIgWgNQgNgGgJgDQgKgDgOgBQgMgCgQAAQgcAAgXAKQgXALgQASQgQASgJAaQgJAaAAAfQAAAjAKAbQAKAcARASQARAUAXAJQAXAKAcAAQASAAATgEQAOgCARgIIAAhCIgrAAQgKgBgGgEQgFgGAAgHIAAg4ICdAAIAAC5QgSANgRAJQgQAHgXAHQgSAFgbAEQgTADgfgBQgwABgpgSg");
	this.shape_1.setTransform(321.375,22.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjHDdIAAm5ICrAAQAzAAAqARQAqAQAeAeQAeAdARApQAQAoAAAvQAAAwgQAoQgRAogeAeQgeAegqAQQgqARgzAAgAhgCOIBEAAQAeAAAVgKQAYgKAPgSQARgTAIgaQAIgbAAggQAAgfgIgbQgIgagRgTQgQgTgXgJQgXgKgcAAIhEAAg");
	this.shape_2.setTransform(279.575,22.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiNDdIAAm5IEbAAIAABPIi0AAIAABnICKAAIAABLIiKAAIAABpIC0AAIAABPg");
	this.shape_3.setTransform(240.15,22.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AiEDdIAAm5IBmAAIAAFnICjAAIAABSg");
	this.shape_4.setTransform(209.75,22.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABcDdIhbkvIhcEvIhdAAIiJm5IBXAAQANAAAJAGQAIAGAEAKIBCD9QADANABAOIBWkYQADgIAIgHQAJgHANAAIAeAAQANAAAIAGQAIAFAFALIBND8QAFAMABAOIBHkWQACgIAKgHQAIgHAOAAIBRAAIiJG5g");
	this.shape_5.setTransform(161.8,22.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhcDQQgrgRgfgeQgegegQgqQgQgpgBgwQABgvAQgpQAQgpAegfQAfgdArgSQAqgSAyAAQA0AAAqASQAqASAeAdQAfAgAQAoQAQApAAAvQAAAwgQApQgQAqgfAeQgdAegrARQgqASg0gBQgzABgpgSgAg0iCQgXAJgPATQgRARgIAbQgJAZAAAhQAAAiAJAZQAIAbARASQAPASAXAKQAZAJAbAAQAdAAAYgJQAWgKAQgSQARgTAIgaQAJgbAAggQAAgfgJgbQgIgagRgSQgQgTgWgJQgYgKgdAAQgbAAgZAKg");
	this.shape_6.setTransform(107.8,22.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ACLDdQgLAAgJgEQgHgDgIgKIjQkGIACAWIABEBIhbAAIAAm5IA2AAIALABIAJACIAHAFIAHAIIDREIIgDkYIBbAAIAAG5g");
	this.shape_7.setTransform(61.175,22.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("ABqDdQgIAAgHgCQgEAAgGgDQgFgCgDgEIgHgIIhjiaQgFgIgJgEQgHgDgPAAIgZAAIAAC8IhmAAIAAm5IBmAAIAACzIARAAQAXAAAJgOIBjiRQAIgMAKgEQALgEAOAAIBaAAIiDCzQgHAJgIAHQgFAFgKAFQANAFAIAHQAJAGAJANICFDNg");
	this.shape_8.setTransform(19.75,22.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,375.2,45.1);


(lib.exMark = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(247,143,49,0.498)").s().p("EgH9BR3QjihjiqijQixiqhcjiQhjjjAAkGQAAkGBjjiQBcjcCxiqQCqiiDihkQDqhjETAAQENAADqBjQDiBkCxCiQCxCqBcDcQBjDiAAEGQAAEGhjDjQhcDiixCqQixCjjiBjQjqBckNAAQkTAAjqhcgArfXBQiHqohOqSQhOqLAAqgMAAAhAuMAg2AAAMAAABAuQAAKghVKLQhOKSh/Kog");
	this.shape.setTransform(274.575,909.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.exMark, new cjs.Rectangle(0,0,549.4,1744), null);


(lib.Button_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AK+FOQhDgbgygxQgwgygbhBQgahDAAhMQAAgVACgUQAGg1ASgwQAchCAvgxQAygxBDgbQBEgcBTAAQBTAABDAcQBFAcAvAxQAwAwAbBCQASAwAGA1QACAUAAAVQAABMgaBDQgaBAgxAzQgvAwhFAcQhDAchTAAQhTAAhEgcgAMAjSQglAQgaAdQgaAdgNAqQgIAZgDAcQgDAUABAVQAAA1ANAqQANApAaAeQAaAdAlAPQAkAQAxAAQAwAAAjgQQAlgOAageQAZgdAPgqQANgqAAg1QAAgVgCgUQgEgcgHgZQgPgrgZgcQgagdglgQQgjgPgwAAQgxAAgkAPgAxaFUQg4gWgognQgogogUg2QgVg2AAhCIAAmiICkAAIAAGiQABAmAJAdQAJAdASAVQARAUAbALQAaALAhAAQAiAAAZgLQAcgMARgTQARgUAJgeQAKgcAAgnIAAmiICkAAIAAGiQABBCgVA2QgWA2gnAoQgoAng4AWQg5AWhGAAQhGAAg5gWgAcdFiQgUAAgNgGQgNgGgMgPIlOmlIAEHAIiRAAIAArDIBWAAIATABIAMADIAMAIIAMANIFQGoIgDgnIAAgkIAAl2ICQAAIAALDgACEFiIAApBIjHAAIAAiCIIyAAIAACCIjIAAIAAJBgAnAFiIAApBIjIAAIAAiCII0AAIAACCIjIAAIAAJBgA9xFiIAArDIEEAAQBLAAAyANQA1APAgAYQAfAYAQAkQAPAkAAArQAAAYgHAWQgGAWgQAUQgNASgUAPIgEACQgVAPgiANQBGAPAiAnQAiAngBA7QAAAsgRAoQgSAnghAdQgjAcgwARQgxAQhBAAgA7MDmIBzAAQAgAAAWgIQAVgJAKgNQANgNAEgQQAEgRAAgRQAAgUgFgPQgFgPgMgLQgNgLgVgGQgUgFgfAAIhyAAgA7Mg3IBVAAQAeAAATgEQAWgEAQgKQAPgKAHgQQAIgRAAgaQAAgagFgQQgHgRgNgKQgNgKgUgFQgUgEgdAAIhfAAg");
	this.shape.setTransform(190.6,36.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,381.2,72.4);


(lib.Big_sym = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AM+M6QikhDh3h4Qh3h3hFikQhEilAAi/QAAjCBCimQBBijB4h3QB4h3CshDQCshCDTAAQBtABBgARQBfASBTAfQBQAgBEArQBDArA1AzIh1CzQgSAZgXAOQgXAPgcAAQgkAAgngYQgygegogUQgsgWgsgMQgsgOgxgFQgxgHg9AAQhzAAhbApQhbAohABJQhBBKgiBnQgjBlAAB/QAACNAmBqQAmBsBEBKQBFBMBcAmQBeAnBuAAQBWAAA/gPQBAgOA6gYIAAkJIitAAQgngBgUgUQgXgVAAgeIAAjfIJvAAIAALiQhDAxhJAjQhJAlhSAWQhVAYhaAKQhcAKhsABQjBgBijhEgAkrNrIAA7WIGXAAIAAbWgA9LNrIAA7WIKEAAQC0AACBAjQB9AgBTA+QBQA9AlBYQAlBXAABtQgBA7gQA2QgRA4gkAwQgjAvg5AnQg4AnhRAeQCuAoBTBeQBSBfAACUQAABwgrBfQgrBghUBJQhSBGh8ApQh5AoifAAgA20I5IEdAAQBRAAAzgVQAygTAegiQAcgfALgqQALgpAAgqQAAgxgNglQgMgmgfgbQgfgbgygOQgzgPhMAAIkbAAgA20iKIDTAAQBEAAA1gJQA4gLAkgXQAmgZATgpQAVgqgBhAQAAg/gPgpQgQgpgggaQgigZgxgLQgwgLhGABIjtAAg");
	this.shape.setTransform(186.8,89.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,373.6,178.9);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.shadow("synched",0);
	this.instance.setTransform(413.4,413.4,1,1,0,0,0,413.4,413.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,826.7,826.7), null);


(lib.Content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_44 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(44).call(this.frame_44).wait(1));

	// Image
	this.instance = new lib.Tween11("synched",0);
	this.instance.setTransform(1481.05,294.25);

	this.instance_1 = new lib.Tween12("synched",0);
	this.instance_1.setTransform(436.05,294.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:436.05},14).wait(31));

	// Title
	this.instance_2 = new lib.Tween13("synched",0);
	this.instance_2.setTransform(1317.75,708);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween14("synched",0);
	this.instance_3.setTransform(259.95,708);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},14).to({state:[{t:this.instance_3}]},15).wait(16));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({_off:true,x:259.95},15).wait(16));

	// Body
	this.instance_4 = new lib.Tween15("synched",0);
	this.instance_4.setTransform(1550.25,866.15);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween16("synched",0);
	this.instance_5.setTransform(468.6,866.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},29).to({state:[{t:this.instance_5}]},15).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(29).to({_off:false},0).to({_off:true,x:468.6},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20,0,1978.9,954.6);


(lib.BigRed_label = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_23 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/

		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(23).call(this.frame_23).wait(1));

	// The
	this.instance = new lib.The_sym("synched",0);
	this.instance.setTransform(602.5,67.45,1,1,0,0,0,31.1,12.2);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:352.8,alpha:1},23).wait(1));

	// Big
	this.instance_1 = new lib.Big_sym("synched",0);
	this.instance_1.setTransform(194.95,-256.05,1.0203,1.0201,0,0,0,186.8,89.5);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:89.85,alpha:1},23).wait(1));

	// Red
	this.instance_2 = new lib.Red_sym("synched",0);
	this.instance_2.setTransform(201.9,267.2,2.3523,2.3514,0,0,0,191.3,75.4);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.9963,scaleY:0.996,x:194.95,y:275.15,alpha:1},23).wait(1));

	// Button
	this.instance_3 = new lib.Button_sym("synched",0);
	this.instance_3.setTransform(-412.65,408.25,1,1,0,0,0,190.6,36.1);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:194.95,alpha:1},23).wait(1));

	// Of
	this.instance_4 = new lib.Of_sym("synched",0);
	this.instance_4.setTransform(603.45,442.05,1,1,90,0,0,10.1,17.6);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({rotation:0,x:187.25,y:442,alpha:1},23).wait(1));

	// Knowledge
	this.instance_5 = new lib.Knowledge_sym("synched",0);
	this.instance_5.setTransform(194.95,708.15,1.016,1.032,0,0,0,187.6,22.6);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:490.25,alpha:1},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-603.2,-347.3,1255.1,1078.7);


(lib.BigRed_btn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Label
	this.BigRed_label = new lib.BigRed_label();
	this.BigRed_label.name = "BigRed_label";
	this.BigRed_label.setTransform(414.05,414.05,1,1,0,0,0,193,256.4);

	this.timeline.addTween(cjs.Tween.get(this.BigRed_label).to({_off:true},3).wait(1));

	// Red
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#EE3249","#761924"],[0,1],-0.1,-0.1,0,-0.1,-0.1,363).s().p("EgnvAnvQwdweAA3RQAA3RQdweQQewdXRAAQXRAAQeQdQQeQeAAXRQAAXRweQeQweQe3RAAQ3RAAweweg");
	this.shape.setTransform(413.45,413.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#00BBBF","#005D5F"],[0,1],-0.1,-0.1,0,-0.1,-0.1,363).s().p("EgnvAnvQwdweAA3RQAA3RQdweQQewdXRAAQXRAAQeQdQQeQeAAXRQAAXRweQeQweQe3RAAQ3RAAweweg");
	this.shape_1.setTransform(413.45,413.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#0294C0","#014A60"],[0,1],-0.1,-0.1,0,-0.1,-0.1,363).s().p("EgnvAnvQwdweAA3RQAA3RQdweQQewdXRAAQXRAAQeQdQQeQeAAXRQAAXRweQeQweQe3RAAQ3RAAweweg");
	this.shape_2.setTransform(413.45,413.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// Base_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#605A54","#CECEC8"],[0.212,1],0,0,0,0,0,393.9).s().p("EgrIArIQx3x4AA5QQAA5QR3x4QR4x3ZQAAQZQAAR4R3QR4R4AAZQQAAZQx4R4Qx4R45QAAQ5QAAx4x4g");
	this.shape_3.setTransform(413.4,413.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(4));

	// Base_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#181615","#C4C4BE"],[0.071,1],0,0,0,0,0,417.1).s().p("EgtqAtqQy7y6AA6wQAA6vS7y7QS7y7avAAQawAAS6S7QS8S7AAavQAAawy8S6Qy6S86wAAQ6vAAy7y8g");
	this.shape_4.setTransform(413.35,413.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-382.2,-189.7,1255.2,1078.8);


(lib.DidU = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_79 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(79).call(this.frame_79).wait(1));

	// container4Info
	this.instance = new lib.Content();
	this.instance.setTransform(1331.8,544.35,1,1,0,0,0,450.4,477.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(79).to({_off:false},0).wait(1));

	// Did_You_Know
	this.instance_1 = new lib.Tween6("synched",0);
	this.instance_1.setTransform(499.4,856);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween7("synched",0);
	this.instance_2.setTransform(499.4,856);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(499.4,856);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},69).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).to({_off:true},5).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(69).to({_off:false},5).to({_off:true},5).wait(1));

	// Dot
	this.instance_4 = new lib.Path_1();
	this.instance_4.setTransform(151.4,-140.8,1,1,0,0,0,149.3,145.8);
	this.instance_4.shadow = new cjs.Shadow("rgba(99,50,48,0.247)",0,0,21);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(47).to({_off:false},0).to({x:127.7,y:893.1},17).to({scaleY:0.5725,y:946.1},5).to({scaleY:1,y:808.3},5).wait(6));

	// maskSymbols_copy (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_47 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_48 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_49 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_50 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_51 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_52 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_53 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_54 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_55 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_56 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_57 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_58 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_59 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_60 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_61 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_62 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_63 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_graphics_64 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(47).to({graphics:mask_graphics_47,x:201.175,y:-445.375}).wait(1).to({graphics:mask_graphics_48,x:201.175,y:-406.3926}).wait(1).to({graphics:mask_graphics_49,x:201.175,y:-367.4103}).wait(1).to({graphics:mask_graphics_50,x:201.175,y:-328.4279}).wait(1).to({graphics:mask_graphics_51,x:201.175,y:-289.4456}).wait(1).to({graphics:mask_graphics_52,x:201.175,y:-250.4632}).wait(1).to({graphics:mask_graphics_53,x:201.175,y:-211.4809}).wait(1).to({graphics:mask_graphics_54,x:201.175,y:-172.4985}).wait(1).to({graphics:mask_graphics_55,x:201.175,y:-133.5162}).wait(1).to({graphics:mask_graphics_56,x:201.175,y:-94.5338}).wait(1).to({graphics:mask_graphics_57,x:201.175,y:-55.5515}).wait(1).to({graphics:mask_graphics_58,x:201.175,y:-16.5691}).wait(1).to({graphics:mask_graphics_59,x:201.175,y:22.4132}).wait(1).to({graphics:mask_graphics_60,x:201.175,y:61.3956}).wait(1).to({graphics:mask_graphics_61,x:201.175,y:100.3779}).wait(1).to({graphics:mask_graphics_62,x:201.175,y:139.3603}).wait(1).to({graphics:mask_graphics_63,x:201.175,y:178.3426}).wait(1).to({graphics:mask_graphics_64,x:201.175,y:217.375}).wait(16));

	// exclamation
	this.exMarkAni = new lib.exMark();
	this.exMarkAni.name = "exMarkAni";
	this.exMarkAni.setTransform(2122.7,226.15,0.7553,0.7553,-150.0004,0,0,318.9,869.9);
	this.exMarkAni.alpha = 0;
	this.exMarkAni.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.exMarkAni).to({regX:274.7,regY:872,scaleX:1,scaleY:1,rotation:720,guide:{path:[2122.7,226.3,2106.7,254.3,2089.4,281.6,2004.6,415.3,1895.6,528.7,1783.3,645.6,1614.9,664.8,1453.5,683.2,1299.5,637.2,1147.5,591.9,994.7,549.2,831,503.5,703.3,617.8,592,717.6,508.5,840.5,408.5,987.6,233.9,980.8,107.1,976.3,49.9,863.5,-25.5,715,67.1,565.5,99.9,512.6,139,463.8]},alpha:1},47).to({alpha:0},12).to({_off:true},16).wait(5));

	// question
	this.queMarkAni = new lib.queMark();
	this.queMarkAni.name = "queMarkAni";
	this.queMarkAni.setTransform(2074.4,538.05,0.5234,0.5234,-41.4697,0,0,471.6,884.6);
	this.queMarkAni.alpha = 0;
	this.queMarkAni.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.queMarkAni).to({regX:321.8,regY:872,scaleX:1,scaleY:1,rotation:0,guide:{path:[2074.4,538.1,2055.9,516.9,2040.1,493.4,2002.9,438.3,1962.3,385.6,1914.6,323.7,1854.4,274.1,1794,224.4,1719.4,201,1641.9,176.8,1560.4,176.4,1483.4,175.9,1409.9,198,1333.7,220.9,1265.7,262.7,1200.8,302.6,1162.6,368.7,1126.1,431.7,1083.7,491.1,1038.9,554.1,995.6,617.8,954.6,677.9,892.9,713.2,848.9,738.4,801,755.9,724.2,783.9,643.4,779.5,566.1,775.3,493.3,748.4,420.3,721.5,353.7,679.9,295.6,643.6,251.1,591.5,200.9,532.8,164.7,464.4]},alpha:1},47).to({alpha:0},12).to({_off:true},16).wait(5));

	// maskSymbols (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_47 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_48 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_49 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_50 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_51 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_52 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_53 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_54 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_55 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_56 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_57 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_58 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");
	var mask_1_graphics_59 = new cjs.Graphics().p("Eg6dBGAMAAAiL/MB07AAAMAAACL/g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(47).to({graphics:mask_1_graphics_47,x:201.175,y:-445.375}).wait(1).to({graphics:mask_1_graphics_48,x:201.175,y:-390.15}).wait(1).to({graphics:mask_1_graphics_49,x:201.175,y:-334.925}).wait(1).to({graphics:mask_1_graphics_50,x:201.175,y:-279.7}).wait(1).to({graphics:mask_1_graphics_51,x:201.175,y:-224.475}).wait(1).to({graphics:mask_1_graphics_52,x:201.175,y:-169.25}).wait(1).to({graphics:mask_1_graphics_53,x:201.175,y:-114.025}).wait(1).to({graphics:mask_1_graphics_54,x:201.175,y:-58.8}).wait(1).to({graphics:mask_1_graphics_55,x:201.175,y:-3.575}).wait(1).to({graphics:mask_1_graphics_56,x:201.175,y:51.65}).wait(1).to({graphics:mask_1_graphics_57,x:201.175,y:106.875}).wait(1).to({graphics:mask_1_graphics_58,x:201.175,y:162.1}).wait(1).to({graphics:mask_1_graphics_59,x:201.175,y:217.375}).wait(21));

	// Symbols
	this.instance_5 = new lib.Path();
	this.instance_5.setTransform(24.65,84,1,1,0,0,0,11.1,84);
	this.instance_5.alpha = 0.25;

	this.instance_6 = new lib.Path_1_1();
	this.instance_6.setTransform(142.25,100.9,1,1,0,0,0,106.5,100.9);
	this.instance_6.alpha = 0.25;

	this.instance_7 = new lib.Path_2();
	this.instance_7.setTransform(142.25,100.9,1,1,0,0,0,106.5,100.9);
	this.instance_7.alpha = 0.25;

	this.instance_8 = new lib.Path_3();
	this.instance_8.setTransform(348.7,269.3,1,1,0,0,0,111.4,269.3);
	this.instance_8.alpha = 0.25;

	this.instance_9 = new lib.Path_4();
	this.instance_9.setTransform(146.15,450.65,1,1,0,0,0,102.5,197.8);
	this.instance_9.alpha = 0.25;

	this.instance_10 = new lib.Path_5();
	this.instance_10.setTransform(146.15,450.65,1,1,0,0,0,102.5,197.8);
	this.instance_10.alpha = 0.25;

	this.instance_11 = new lib.Path_6();
	this.instance_11.setTransform(142.25,320.9,1,1,0,0,0,106.5,190.5);
	this.instance_11.alpha = 0.25;

	var maskedShapeInstanceList = [this.instance_5,this.instance_6,this.instance_7,this.instance_8,this.instance_9,this.instance_10,this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]},47).wait(33));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-884.3,-432.7,3662.8999999999996,2264.2);


// stage content:
(lib.DidYouKnow_template = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,9];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();

		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/

		this.stop();



		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.

		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/


		this.btnBigRedButton.addEventListener("click", fl_ClickToGoToAndStopAtFrame_4.bind(this));

		function fl_ClickToGoToAndStopAtFrame_4()
		{
			this.gotoAndStop(10);
		}




		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.

		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/


		this.btnRewindButton.addEventListener("click", fl_ClickToGoToAndStopAtFrame_5.bind(this));

		function fl_ClickToGoToAndStopAtFrame_5()
		{
			this.gotoAndStop(1);
		}
	}
	this.frame_9 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/

		this.stop();

	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(9).call(this.frame_9).wait(21));

	// Rewind
	this.btnRewindButton = new lib.Rewind();
	this.btnRewindButton.name = "btnRewindButton";
	this.btnRewindButton.setTransform(1855.6,975.5,1,1,0,0,0,36.8,42.6);
	new cjs.ButtonHelper(this.btnRewindButton, 0, 1, 2, false, new lib.Rewind(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btnRewindButton).wait(30));

	// DYK
	this.instance = new lib.DidU();
	this.instance.setTransform(877.35,510.8,1,1,0,0,0,890.9,510.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:false},0).wait(21));

	// Highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1.5,1,1).p("AGuKtQo9pxkero");
	this.shape.setTransform(589.875,768.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(1,1,1).p("EhAjAY/QkdrkAAtbQAA8lUO0NQUN0OclAAQcmAAUNUOQUOUNAAclQAAcm0OUNQ0NUO8mAAQ8lAA0N0OQhMhMhIhO");
	this.shape_1.setTransform(960,540);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},9).wait(21));

	// button
	this.btnBigRedButton = new lib.BigRed_btn();
	this.btnBigRedButton.name = "btnBigRedButton";
	this.btnBigRedButton.setTransform(960.05,540.05,1.1297,1.1297,0,0,0,413.4,413.4);
	new cjs.ButtonHelper(this.btnBigRedButton, 0, 1, 2, false, new lib.BigRed_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btnBigRedButton).to({_off:true},9).wait(21));

	// shadow
	this.instance_1 = new lib.Symbol1();
	this.instance_1.setTransform(960.1,540.1,1.1379,1.1379,0,0,0,413.4,413.4);
	this.instance_1.shadow = new cjs.Shadow("rgba(51,51,51,1)",11,11,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},9).wait(21));

	// bg
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.rf(["#F4E5DA","#E0B467"],[0,1],0,0,0,0,0,1102).s().p("EiV/BUYMAAAiovMEr/AAAMAAACovg");
	this.shape_2.setTransform(960,540);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["#F4E5DA","#E0B467"],[0,1],0,0,0,0,0,213.5).s().p("A3aSnQpsntAAq6QAAq5JsnuQJtntNtAAQNuAAJsHtQA8AwA2AxQH7HQAAJ2QAAK6ptHtQkaDhlQB7QmSCSneAAQttAAptnug");
	this.shape_3.setTransform(707.25,278.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#F4E5DA","#E0B467"],[0,1],-56.1,-0.1,0,-56.1,-0.1,174).s().p("AyPT8QFQh7EajhQJsntAAq5QAAp3n6nQQJ7AgHOFrQH7GPgBIzQABIxn7GPQn6GOrMAAQlFAAkahSg");
	this.shape_4.setTransform(912.05,304.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},9).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},20).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,107.3,1687.9,972.7);
// library properties:
lib.properties = {
	id: 'B36E64C37C600549A622E8827C46C72C',
	width: 1920,
	height: 1080,
	fps: 13,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Image.png", id:"Image"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B36E64C37C600549A622E8827C46C72C'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {
	var lastW, lastH, lastS=1;
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();
	function resizeCanvas() {
		var w = lib.properties.width, h = lib.properties.height;
		var iw = window.innerWidth, ih=window.innerHeight;
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
		if(isResp) {
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
				sRatio = lastS;
			}
			else if(!isScale) {
				if(iw<w || ih<h)
					sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==1) {
				sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==2) {
				sRatio = Math.max(xRatio, yRatio);
			}
		}
		domContainers[0].width = w * pRatio * sRatio;
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {
			container.style.width = w * sRatio + 'px';
			container.style.height = h * sRatio + 'px';
		});
		stage.scaleX = pRatio*sRatio;
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;
		stage.tickOnUpdate = false;
		stage.update();
		stage.tickOnUpdate = true;
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;

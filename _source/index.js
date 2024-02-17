import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);

  let firstSectionIn = gsap.timeline();

  firstSectionIn.from('#name', {
    scale: 0
  });

  firstSectionIn.from('#job', {
    scale: 0
  },
  '<');

  firstSectionIn.from('#magnifying-glass svg', {
    scale: 5,
    opacity: 0
  },
  '<');

  let firstSectionOut = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-2',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true
    }
  });

  firstSectionOut.to('#name', {
    scale: 0
  });

  firstSectionOut.to('#job', {
    scale: 0
  },
  0);

  firstSectionOut.to('#magnifying-glass svg', {
    scale: 5,
    opacity: 0
  },
  0);

  let thumbprint = gsap.timeline({
    scrollTrigger: {
      trigger: '#thumbprint',
      start: 'top +=80%',
      end: 'center center',
      scrub: true
    }
  });

  thumbprint.from('#thumbprint',{
    opacity: 0
  });

  // Prepare transition of magnifying glass behind the scenes
  thumbprint.to('#magnifying-glass', {
    translateY: '200%'
  },
  0);

  let footprints = gsap.timeline({
    scrollTrigger: {
      trigger: '#footprints',
      start: 'top +=80%',
      end: 'center center',
      scrub: true
    }
  });

  footprints.from('#footprints #footprint-1',{
    opacity: 0
  });

  footprints.from('#footprints #footprint-2',{
    opacity: 0
  });

  footprints.from('#footprints #footprint-3',{
    opacity: 0
  });

  footprints.from('#footprints #footprint-4',{
    opacity: 0
  });

  footprints.to('#magnifying-glass', {
    translateY: '400%',
  },
  0);

  let fifthSectionIn = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-5',
      start: 'top bottom',
      end: 'center center',
      scrub: true
    }
  });

  fifthSectionIn.to('#magnifying-glass svg', {
    scale: 1,
    opacity: 1
  },
  0);

  fifthSectionIn.from('#collaborators', {
    scale: 0
  },
  0);

  let sixthSectionIn = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-6',
      start: 'top bottom',
      end: 'center center',
      scrub: true
    }
  });

  sixthSectionIn.to('#magnifying-glass', {
    translateY: '500%',
  });

  sixthSectionIn.from('#skills', {
    scale: 0
  },
  0);

  // Play video when it enter the viewport
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // We can only control playback without insteraction if video is mute
    video.muted = true;
    // Play is a promise so we need to check we have it
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio !== 1 && !video.paused) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(video);
      });
    }
  });
});

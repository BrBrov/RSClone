# RSClone
### RSClone - final task of RSSchool

#### Start: 31-01-2023

#### Deadline: 21-02-2023

### Team

[Dzmitry Shiwe](https://github.com/dzmitrysh)

[IrinaPIka](https://github.com/irinapika)

[BrBrov](https://github.com/BrBrov)

### Mentor

[tropler](https://app.rs.school/profile?githubId=tropler)

#### Technologies:
1. Web Animations API
 - KeyframeEffect - API for create animate effects
   ```
   const elementKeyFrames = new KeyframeEffect(
   HTMLElement, // element to animate
   [
     { transform: "translateY(0%)" }, // frame
     { transform: "translateY(100%)" }, // frame
   ],
     { duration: 3000, fill: "forwards" } // options of animation
   );
   ```
 - Animation - object of animation
  ```
  const animation = new Animation(
    elementKeyframes,
    document.timeline
  );
  ```
 - animation.play() - for start animation
2. new Audio() - HTMLAudioElement 
 - Audio track data
   ```
   duration
   currentTime
   volume
   src
   ```
 - Events
   ```
   canplay
   ended
   loadedmetadata
   durationchange
   ```
3. Web Crypto API for authorization and registration (using AES-CBC)
 - generateKey(algorithm, extractable, keyUsages) - for generate random key;
  ```
  window.crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 128
  },
    true,
    ["encrypt", "decrypt"]
  );
  ```
 - exportKey(format, key) and importKey(format, keyData, algorithm, extractable, keyUsages) for 
   create key for for HTTP transfer
   ```
   window.crypto.subtle.exportKey(
    "json",
     key
   );
 
   ```
 - decrypt(algorithm, key, data) and encrypt(algorithm, key, data)
   ```
    window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      counter: iv,
      length: 128,
    },
      key,
      data
    );
   ```
 - digest(algorithm, data) for getting hash of login and password
   ```
     crypto.subtle.digest('SHA-256', msgUint8);
   ```
 - window.crypto.getRandomValues(typedArray) for getting random iv-Key
   ```
    window.crypto.getRandomValues(new UintArray(8));
   ```
 #### All web crypto API is asynchronous!
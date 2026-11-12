---
title: Implementing a feedback screen in React Native
slug: implementing-a-feedback-screen-in-react-native
date: '2020-10-28T20:56:13.714Z'
description: 'A beginner-friendly React Native tutorial: build a feedback screen where a slider changes the emoji, label and background color as the user rates.'
tags:
  - react-native
  - beginner
  - tutorial
  - feedback
  - react
lang: en
translation: implementando-uma-tela-de-feedback-em-react-native
mediumUrl: >-
  https://medium.com/@cefasgpereira/implementing-a-feedback-screen-in-react-native-c7621ab9310c
---

Another day, I was browsing Pinterest/Behance and suddenly I came across a super cool feedback screen designed by [Urvashi Jain](https://www.behance.net/urvashi_j). Coincidentally, my team was working on an app where we were going to develop a feedback screen with the same approach in which a smiley emoji changes according to the user’s rating. As it was something fun to develop I thought of describing this process as a tutorial, because I believe we can learn how UX techniques can make a simple task, like giving rates, into something much more interesting for the user. In addition, it is a good exercise for those who are planning to practice a little bit of React Native. This is a beginner/intermediate tutorial.

![Feedback Screen UI, by Urvashi Jain](/blog/implementing-a-feedback-screen-in-react-native/01.webp)
***Feedback Screen UI, by Urvashi Jain***

Well, we are not going to develop exactly the same screen designed by Urvashi, not least because we don’t have the assets, but the idea is the same and the result will also be very cool.

---

## 1- Getting Started

So, to start I will consider that you already have React Native installed and set up on your machine according to your OS. You can always check the process in the [documentation](https://reactnative.dev/docs/0.59/getting-started). You can use Expo if you will, but I’ll use React Native CLI for this tutorial because I consider it a more generic solution.

### React Native CLI

```bash
react-native init feedbackScreen
```

### Expo

```bash
expo init feedbackScreen
```

## 2- Installing Dependencies

Now that we have our project created, we will install the modules that we will use to develop the interface. We are going to use the [React Native Slider](https://github.com/jeanregisser/react-native-slider) to help us.

### React Native CLI

```bash
yarn add react-native-slider
```

### Expo

```bash
yarn add react-native-slider
```

## 3- Settings (Optional)

This is an optional step, which I do some personal settings. You can skip it if you prefer, **just be careful with the file formats and location** that may differ a little bit. What I set here is the option to use *.jsx* extension and also move the code inside the *src* folder.

**Project Structure**

```text
- android
- ios
- node_modules
- src
  - components
  - screens
  - utils
    -assets
  - App.jsx
- babel.config.js
- index.js
- metro.config.js
- package.json
- yarn.lock
```

<!-- TODO: Medium embedded https://gist.github.com/cefasgarciapereira/78777bf199280043b59f450be36ce711 here. Paste its code as a fenced block. -->

Besides that settings, I have the habit to create a package.json inside each folder that I export my components. If you’ve never seen it, search by “Absolute Path”. Basically it allows us to import components passing only the folder name instead the whole path.

```javascript
// Relative Path
import Component from '../../../components/Component';

// Absolute Path
import {Component} from 'components';
```

See? Much better, isn’t it?

## 4- Coding

Finally, let’s get to what really matters. So… The logic is simple. We will use te Slider to get some value from the user. Since we have 5 possibilities, the values of the Slider will range from 0 to 4. To each value we will assign a label, color and emoji.

```javascript
const colors = ['#F5CECE', '#FFE3D5', '#FFF5D1', '#F0FAEA', '#D4E9C6'];
const labels = ['Horrible', 'Not Good', 'OK!', 'Good', 'Excellent'];
const faces  = [crying, sad, straight, laughing, smiling];
```

I did it using arrays, that seemed the simpliest solution to me. So, when the user give us a value through the Slider, what we have to do is to get the value of the array in the correspondent position.

```jsx
<View style={{
...feedbackStyles.container,
backgroundColor: colors[rate] // set the background color of the screen
}}>
/*
... code ...
*/
<Image
style={feedbackStyles.smiley}
source={faces[rate]}/> // set the emoji
<Text>{labels[rate]}</Text> // set the label
```

In order to these things work properly, we have to set up the slider. The component is really easy to use and understand.

```javascript
<Slider
  style={feedbackStyles.slider}
  value={rate}
  onValueChange={value => setRate(value)}
  minimumValue={0}
  maximumValue={4}
  step={1}
  thumbTintColor={colors[rate]}
  thumbStyle={feedbackStyles.sliderThumb}
  minimumTrackTintColor="#666"
  maximumTrackTintColor="#666"
/>
```

So… I set the minimum and maximum value. The step is how much the slider should increase or decrease. Since we don’t want values like 4.5. I defined it to be 1. The rest of the props are used to style.

If you want the exact same style I used in my example, you can get it here:

```javascript
import {StyleSheet} from 'react-native';

export const  feedbackStyles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontWeight: 'bold',
        marginVertical: 10
    },
    smiley:{
        width: 100,
        height: 100,
        margin: 100
    },
    slider:{
        width: '80%'
    },
    sliderThumb:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#666'
    },
    buttonContainer:{
        position: 'absolute',
         width: '100%',
         padding: 15,
         bottom: 0,
         backgroundColor: 'black',
         alignItems: 'center',
         justifyContent: 'center'
    },
    buttonLabel:{
        color: 'white',
        fontWeight: 'bold'
    }
});
```

## Conclusion

That is it! Really short and simple demonstration, but fun to do and good to practice. I think it can be helpful to play with state, styles, componentization and maybe useful to your project.

![Demo of the finished feedback screen: dragging the slider changes the emoji, the label (from Horrible to Excellent) and the background color](/blog/implementing-a-feedback-screen-in-react-native/02.webp)

I hope it was useful and gave you good insights.

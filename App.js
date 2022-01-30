import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Timer = forwardRef(({ maxTime, onEnd }, ref) => {
  const [timerCount, setTimer] = useState(maxTime);
  useImperativeHandle(ref, () => ({
    startTimer() {
      start();
    }
  }));
  const start = () => {
    setTimer(maxTime);
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          onEnd();
          return 0;
        }
        return lastTimerCount - 1;
      });
    }, 1000);
  };

  return (
    <Text accessibilityRole="link" style={StyleSheet.compose(styles.link)}>
      {timerCount}
    </Text>
  );
});

const App = () => {
  const timer1 = useRef();
  const timer2 = useRef();
  const startTimerOne = () => {
    timer1.current.startTimer();
  };
  const startTimerTwo = () => {
    timer2.current.startTimer();
  };
  return (
    <View style={styles.app}>
      <Timer ref={timer1} onEnd={() => {}} maxTime={3} />
      <Button onPress={startTimerOne} title="timer 1" />
      <Timer ref={timer2} onEnd={startTimerOne} maxTime={10} />
      <Button onPress={startTimerTwo} title="timer 2" />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  link: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10
  }
});

export default App;

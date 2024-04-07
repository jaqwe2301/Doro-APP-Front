import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Timer({ count, setCount, smallStyle }) {
  //   const [count, setCount] = useState(0);
  const [mm, setMM] = useState(0);
  const [ss, setSS] = useState(0);

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [count]);

  useEffect(() => {
    setMM(Math.floor(count / 60));
    setSS(count % 60);
  }, [count, setMM, setSS]);

  return (
    <Text style={[styles.timer, smallStyle]}>{`${String(mm).padStart(
      2,
      "0"
    )}:${String(ss).padStart(2, "0")}`}</Text>
  );
}

export default Timer;

const styles = StyleSheet.create({
  timer: {
    color: GlobalStyles.colors.red,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    position: "absolute",
    top: 10,
    right: 12,
  },
});

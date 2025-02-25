import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function StepIndicator({ step1, step2, step3, gaiola, peca }: { step1:boolean ,step2: boolean; step3: boolean, peca: string, gaiola: string }) {
  
  const height1 = useSharedValue(0);
  const height2 = useSharedValue(0);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);

  useEffect(() => {
    height1.value = withTiming(step2 ? 100 : 0, { duration: 700 });
    opacity1.value = withTiming(step2 ? 1 : 0, { duration: 500 });

    height2.value = withTiming(step3 ? 100 : 0, { duration: 700 });
    opacity2.value = withTiming(step3 ? 1 : 0, { duration: 500 });
  }, [step2, step3]);

  const animatedLine1 = useAnimatedStyle(() => ({
    height: height1.value,
    opacity: opacity1.value,
  }));

  const animatedLine2 = useAnimatedStyle(() => ({
    height: height2.value,
    opacity: opacity2.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.containerShow}>
        <Text style={styles.text}>Informar Peça</Text>
      </View>

      <Animated.View style={[styles.line, animatedLine1]} />
      
      {step2 &&
        <View style={styles.containerShow}>
          <Text style={styles.text}>Peça: {peca}</Text>
        </View>
      }

      <Animated.View style={[styles.line, animatedLine2]} />
      
      {step3 &&
        <View style={styles.containerShow}>
          <Text style={styles.text}>Gaiola: {gaiola}</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: 'center',
    marginHorizontal: 40
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',    
    marginHorizontal: 20,
    textAlign: 'center'
  },
  line: {
    width: 5,
    backgroundColor: "green",
    alignSelf: 'center',
    borderRadius: 10
  },
  containerShow: {
    backgroundColor: 'green',
    minWidth: 150,
    minHeight: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  }
});

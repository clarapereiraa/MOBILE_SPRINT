import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const DateTimePickerDefault = ({ type, buttonTitle, dateKey, setValue }) => {
  const [isDatepickerVisable, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (type === "time") {
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedTime = `${hour}:${minute}`;
      setValue((prevState) => ({
        ...prevState,
        [dateKey]: formattedTime,
      }));
    } else {
      setValue((prevState) => ({
        ...prevState,
        [dateKey]: date, //date: aaaa:mm:dd
      }));
    }
    hideDatePicker();
  };
  return (
    <View style={{ marginTop: 10}}>
      <Button title={buttonTitle} onPress={showDatePicker} color="red" />
      <DateTimePicker
        isVisible={isDatepickerVisable}
        mode={type}
        locale="pt_BR"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        pickerContainerStyleIOS={{ backgroundColor: "#fff" }}
        textColor="#000"
      />
    </View>
  );
};

export default DateTimePickerDefault;

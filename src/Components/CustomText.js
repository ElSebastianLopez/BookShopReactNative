/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, } from 'react-native';

const FormatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso sumamos 1
  const year = date.getFullYear();

  // Asegurémonos de que los valores tengan dos dígitos
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Devolvemos la fecha formateada
  return `${formattedDay}/${formattedMonth}/${year}`;
};

const CustomText = ({ dateString }) => {
  const formattedDate = FormatDate(dateString);

  return <Text>{formattedDate}</Text>;
};

export default CustomText;

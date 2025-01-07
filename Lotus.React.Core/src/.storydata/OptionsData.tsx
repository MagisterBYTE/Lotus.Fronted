import { IOption } from 'lotus-core';
import React from 'react';
import { FcAddressBook, FcCloth, FcFactoryBreakdown } from 'react-icons/fc';
import { collapseAnalysisIcon, curveArrayIcon, hydraulicAnalysisIcon } from './IconsBase64';

export const OptionsText:IOption[] = [
  { text: 'Первый', value: 1 }, 
  { text: 'Второй', value: 2 }, 
  { text: 'Третий', value: 3 }];

export const OptionsTextRoles:IOption[] = [
  {value: 1, text: 'Админ'}, 
  {value: 2, text: 'Модератор'}, 
  {value: 3, text: 'Пользователь'}
]

export const OptionsIconReact:IOption[] = [
  { text: '', value: 1, icon: <FcAddressBook /> },
  { text: '', value: 2, icon: <FcCloth /> },
  { text: '', value: 3, icon: <FcFactoryBreakdown /> }
]


export const OptionsIconImage:IOption[] = [
  { text: '', value: 1, icon: curveArrayIcon },
  { text: '', value: 2, icon: hydraulicAnalysisIcon },
  { text: '', value: 3, icon: collapseAnalysisIcon }
]

export const OptionsTextAndIconReact:IOption[] = [
  { text: 'Первый', value: 1, icon: <FcAddressBook /> },
  { text: 'Второй', value: 2, icon: <FcCloth /> },
  { text: 'Третий', value: 3, icon: <FcFactoryBreakdown /> }]

export const OptionsTextAndIconImage:IOption[] = [
  { text: 'Массив кривых', value: 1, icon: curveArrayIcon },
  { text: 'Анализ гидроразрыва', value: 2, icon: hydraulicAnalysisIcon },
  { text: 'Анализ обрушения', value: 3, icon: collapseAnalysisIcon }]
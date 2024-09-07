import { ISelectOption } from 'lotus-core';
import React from 'react';
import { FcAddressBook, FcCloth, FcFactoryBreakdown } from 'react-icons/fc';
import { collapseAnalysisIcon, curveArrayIcon, hydraulicAnalysisIcon } from './IconsBase64'

export const SelectOptionsText:ISelectOption[] = [
  { text: 'Первый', value: 1 }, 
  { text: 'Второй', value: 2 }, 
  { text: 'Третий', value: 3 }];

export const SelectOptionsIconsSvg:ISelectOption[] = [
  { text: 'Первый', value: 1, icon: <FcAddressBook /> },
  { text: 'Второй', value: 2, icon: <FcCloth /> },
  { text: 'Третий', value: 3, icon: <FcFactoryBreakdown /> }]

export const SelectOptionsIconsBase:ISelectOption[] = [
  { text: 'Массив кривых', value: 1, icon: curveArrayIcon },
  { text: 'Анализ гидроразрыва', value: 2, icon: hydraulicAnalysisIcon },
  { text: 'Анализ обрушения', value: 3, icon: collapseAnalysisIcon }]
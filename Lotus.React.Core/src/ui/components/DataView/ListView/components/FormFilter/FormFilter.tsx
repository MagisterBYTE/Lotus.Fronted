import React, { Ref, useImperativeHandle, useState } from 'react';
import { FilterPropertyHelper, IFilterProperty, IObjectInfo, PropertyTypeDescriptors, StringHelper } from 'lotus-core';
import { VerticalStack } from 'ui/components/Layout';
import { FilterInputNumber } from './components/FilterInputNumber';
import { FilterInputText } from './components/FilterInputText';
import { FilterMultiSelect } from './components/FilterMultiSelect';
import { FilterOneSelect } from './components/FilterOneSelect';

export interface IFormFilterRefType 
{
  getFilters: () => IFilterProperty[];
  clearFilters: () => void;
}

export interface IFormFilterProps
{
  /**
   * Свойства объекта
   */
  objectInfo: IObjectInfo;

  /**
   * Изначальное значение фильтров
   */
  initialFilterProperties: IFilterProperty[];
}

export const FormFilter = React.forwardRef((props: IFormFilterProps, ref: Ref<IFormFilterRefType>) => 
{
  const { objectInfo, initialFilterProperties } = props;

  const [filterProperties, setFilterProperties] = useState<IFilterProperty[]>(initialFilterProperties);

  const properties = objectInfo.getProperties();

  const handleSetFilterProperty = (fieldName: string, filterProperty: IFilterProperty) =>
  {
    let newFilterProperties = [...filterProperties];

    const hasValue = FilterPropertyHelper.hasValue(filterProperty);

    const findFilterProperty = newFilterProperties.find((x) => x.propertyName === filterProperty.propertyName);
    if (findFilterProperty)
    {
      if (hasValue)
      {
        findFilterProperty.function = filterProperty.function;
        findFilterProperty.isSensitiveCase = filterProperty.isSensitiveCase;
        findFilterProperty.value = filterProperty.value;
        findFilterProperty.values = filterProperty.values;
      }
      else
      {
        newFilterProperties = filterProperties.filter(x => x.propertyName !== filterProperty.propertyName);
      }
    }
    else
    {
      newFilterProperties.push(filterProperty);
    }

    setFilterProperties(newFilterProperties);
  }

  const clearFilters = () => 
  {
    setFilterProperties([]);
  }

  const getFilters = (): IFilterProperty[] => 
  {
    return (filterProperties);
  }

  useImperativeHandle(ref, () => ({ getFilters, clearFilters }));

  return (
    <VerticalStack gap={1}>
      {
        properties.map((property, index) =>
        {
          if (!property.filtering) return <span key={index} />;

          if (property.filtering && property.filtering.variant === 'select')
          {
            return <FilterOneSelect
              labelProps={{ isTopLabel: true, children: property.name }}
              width='100%'
              options={property.options!}
              key={property.name}
              propertyDescriptor={property}
              initialFilterProperty={filterProperties.find(x => x.propertyName === StringHelper.capitalizeFirstLetter(property.fieldName))}
              onSetFilterProperty={handleSetFilterProperty} />
          }
          if (property.filtering && property.filtering.variant === 'multi-select')
          {
            return <FilterMultiSelect
              labelProps={{ isTopLabel: true, children: property.name }}
              width='100%'
              options={property.options!}
              key={property.name}
              propertyDescriptor={property}
              initialFilterProperty={filterProperties.find(x => x.propertyName === StringHelper.capitalizeFirstLetter(property.fieldName))}
              onSetFilterProperty={handleSetFilterProperty} />
          }

          switch (property.propertyTypeDesc.id)
          {
            case PropertyTypeDescriptors.String.id:
              return <FilterInputText
                labelProps={{ isTopLabel: true, children: property.name }}
                key={property.name}
                propertyDescriptor={property}
                initialFilterProperty={filterProperties.find(x => x.propertyName === StringHelper.capitalizeFirstLetter(property.fieldName))}
                onSetFilterProperty={handleSetFilterProperty} />
            case PropertyTypeDescriptors.Integer.id:
            {
              return <FilterInputNumber
                labelProps={{ isTopLabel: true, children: property.name }}
                key={property.name}
                propertyDescriptor={property}
                initialFilterProperty={filterProperties.find(x => x.propertyName === StringHelper.capitalizeFirstLetter(property.fieldName))}
                onSetFilterProperty={handleSetFilterProperty} />
            }
          }

          return (<></>);
        })
      }
    </VerticalStack>
  )
});

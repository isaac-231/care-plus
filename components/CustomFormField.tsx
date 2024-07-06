import React from 'react'
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';

interface CustomProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {

    const { fieldType, iconSrc, iconAlt, placeholder } = props;

    const renderFieldContent = () => {
        switch (fieldType) {
            case FormFieldType.INPUT:
                return (
                    <div className="flex rounded-md border border-dark-500 bg-dark-400">
                        {iconSrc && (
                            <Image
                             src={iconSrc} 
                             alt={iconAlt || 'icon'}
                             width={24} 
                             height={24} 
                             className='ml-2' />
                        )}

                        <FormControl>
                            <Input 
                                placeholder={placeholder}
                                {...field}
                                className='shad-input border-0'
                            />
                        </FormControl>
                    </div>
                );
            default:
                return null;
        }
    };

    return renderFieldContent();
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, children, renderSkeleton } = props;
  return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                )}
               
               <RenderField field={field} props={props} />

               <FormMessage className='shad-error '/>
            </FormItem>
          )}
        />
  )
}

export default CustomFormField
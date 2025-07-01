import { forwardRef, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Message } from './error.field';
import { FieldError } from 'react-hook-form';

type SelectProps<T> = SelectHTMLAttributes<HTMLSelectElement> & {
  data: T[];
  error?: string | FieldError;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  labelField: keyof T;
  valueField: keyof T;
  keyField?: keyof T;
};

type SelectComponent = (<T>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement | null) & { displayName?: string }; 

function _SelectInner<T extends Record<string, any>>(
  {
    data,
    defaultValue,
    placeholder,
    className,
    error,
    labelField,
    valueField,
    keyField,
    ...rest
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className="w-full">
      <select
        ref={ref}
        className={twMerge(
          `w-full select select-bordered ${error ? 'border-red-600' : ''}`,
          className
        )}
        defaultValue={defaultValue ?? ''}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {data.map(item => {
          const keyVal = (item[keyField ?? valueField] ?? '') as React.Key;
          const valueVal = String(item[valueField] ?? '');
          const labelVal = String(item[labelField] ?? '');

          return (
            <option key={keyVal} value={valueVal}>
              {labelVal}
            </option>
          );
        })}
      </select>

      <Message isError={Boolean(errorMessage)} message={errorMessage} />
    </div>
  );
}

const Select = forwardRef(_SelectInner) as SelectComponent;
Select.displayName = 'Select';

export default Select;
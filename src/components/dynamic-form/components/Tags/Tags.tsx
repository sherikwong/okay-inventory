import React from 'react'
import _TagsInput from 'react-tagsinput'

export const TagsInput = (value: string[], onChange) => {
  return  <_TagsInput value={value} onChange={onChange} />
}

import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import FormGroup from '../../../../../components/FormGroup'

describe('<FormGroup />', () => {
  let props

  beforeEach(() => {
    const validate = () => {}
    const onChange = () => {}

    props = {
      id: 'my-form-group',
      label: 'My Form Group',
      validate,
      onChange,
    }
  })

  it('should set an empty value when default value is not provided', () => {
    const wrapper = shallow(<FormGroup {...props} />)

    const input = wrapper.find('input')
    expect(input.length).toBe(1)
    expect(input.prop('value')).toBe('')
  })

  it('should set default value', () => {
    const defaultValue = 'default value'

    const wrapper = shallow(<FormGroup {...props} value={defaultValue} />)

    const input = wrapper.find('input')
    expect(input.prop('value')).toBe(defaultValue)
  })

  it('should render select control when type is selected', () => {
    const wrapper = shallow(<FormGroup {...props} type="select" />)
    const select = wrapper.find('select')
    expect(select.length).toBe(1)
  })

  it('should propagate onChange event', () => {
    // const spy = expect.spyOn(props, 'onChange')
    const spy = expect.spyOn(props, 'onChange')

    const wrapper = shallow(<FormGroup {...props} />)

    const input = wrapper.find('input')

    const changedValue = 'some value'
    input.simulate('change', {
      target: {
        value: changedValue,
      },
    })

    expect(spy.calls.length).toBe(1)
    expect(spy.calls[0].arguments).toEqual([changedValue])

    spy.restore()
    expect.restoreSpies()
  })

  it('should not show error when validation succeeds', () => {
    const spy = expect.spyOn(props, 'validate').andReturn(true)

    const wrapper = shallow(<FormGroup {...props} />)

    const input = wrapper.find('input')
    input.simulate('blur')

    expect(wrapper.find('.has-error').length).toBe(0)

    spy.restore()
    expect.restoreSpies()
  })

  it('should not show error when value is not dirty yet even if validation fails', () => {
    const spy = expect.spyOn(props, 'validate').andReturn('some error')

    const wrapper = shallow(<FormGroup {...props} />)

    expect(wrapper.find('.has-error').length).toBe(0)

    spy.restore()
    expect.restoreSpies()
  })

  it('should show error when validation fails', () => {
    const errorMessage = 'some error'
    const spy = expect.spyOn(props, 'validate').andReturn(errorMessage)

    const wrapper = shallow(<FormGroup {...props} />)

    const input = wrapper.find('input')
    input.simulate('blur')

    expect(wrapper.find('.has-error').length).toBe(1)
    expect(wrapper.find('.text-danger').length).toBe(1)
    expect(wrapper.find('.text-danger').text()).toBe(errorMessage)

    spy.restore()
    expect.restoreSpies()
  })
})

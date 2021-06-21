import {render, fireEvent, act} from '@testing-library/react'
import AuthForm from '../AuthForm'
import React from 'react'

describe('Auth form rendering test', () => {
    it('Logo rendering test', () => {
        const rendered = render(<AuthForm />)
        const logo = rendered.getByText(/ITime/i)
        expect(logo).toBeInTheDocument()
    })

    it('Button rendering test', () => {
        const rendered = render(<AuthForm />)
        const btn = rendered.getByRole('button')
        expect(btn).toBeInTheDocument()
    })

    it('Inputs rendering test', () => {
        const rendered = render(<AuthForm />)
        const input = rendered.getByRole('textbox')
        expect(input).toBeInTheDocument()
    })
})

describe('Auth actions test', () => {
    it('Auth login entering test', () => {
        let rendered
        act(() => rendered = render(<AuthForm />))
        const input = rendered.getByRole('textbox')
        act(() => fireEvent.change(input,{ target: { value: 'test value' } }))
        expect(rendered.getByDisplayValue(/test value/)).toBeInTheDocument()
    })
})
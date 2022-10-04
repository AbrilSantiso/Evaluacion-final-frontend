import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { usePersonalInfoContext } from 'dh-marvel/context/PersonalInfoContext';
import PaymentForm, { PaymentInformationData, PaymentSchema } from './PaymentForm';

const handleNext = jest.fn();

const handleBack = jest.fn();

describe('Payment Information form', () => {

    describe('when rendering the Payment Information Form', () => {
        it('should render the step 0 with all the inputs', () => {

            render(
                <PaymentForm handleNext={handleNext} handleBack={handleBack} />
            )
            const cardNumber = screen.getByLabelText('Número de tarjeta')
            const cardName = screen.getByLabelText("Nombre como aparece en la tarjeta")
            const cardExpiration = screen.getByLabelText("EXP MM/YY")
            const cvv = screen.getByLabelText('CVV')
            expect(cardNumber).toBeInTheDocument();
            expect(cardName).toBeInTheDocument();
            expect(cardExpiration).toBeInTheDocument();
            expect(cvv).toBeInTheDocument();

        })

        it('should call the handleNext function if all the inputs are filled in the correct way', async () => {

            render(
                <PaymentForm handleNext={handleNext} handleBack={handleBack} />
            )
            const cardNumber = screen.getByLabelText('Número de tarjeta')
            const cardName = screen.getByLabelText("Nombre como aparece en la tarjeta")
            const cardExpiration = screen.getByLabelText("EXP MM/YY")
            const cvv = screen.getByLabelText('CVV')
            await userEvent.type(cardNumber, '11111111111111')
            await userEvent.type(cardName, 'Abril')
            await userEvent.type(cardExpiration, '10/19')
            await userEvent.type(cvv, '123')
            await userEvent.click(screen.getByText("Seguir"));
            expect(handleNext).toBeCalledWith({
                "Número de tarjeta": "11111111111111",
                "Nombre como aparece en la tarjeta": "Abril",
                "EXP MM/YY": "10/19",
                CVV: '123',
                focus: "CVV"
            })
        })
    })
    describe("Yup schemas", ()=>{
        describe('when validating a valid login schema', () => {
            it('should return true', async () => {
                
                expect(await PaymentSchema.isValid({
                    "Número de tarjeta": "24242424242424",
                    "Nombre como aparece en la tarjeta": "Abril",
                    "EXP MM/YY": "10/19",
                    CVV: '123',
                    focus: "number"
                })).toBeTruthy();
            })
        })
        describe('when validating an invalid login schema', () => {

            const invalidCardNumber: PaymentInformationData = {
                "Número de tarjeta": "11",
                "Nombre como aparece en la tarjeta": "Abril",
                "EXP MM/YY": "10/19",
                CVV: '123',
                focus: "number"
            }
            
            const invalidName: PaymentInformationData = {
                "Número de tarjeta": "24242424242424",
                "Nombre como aparece en la tarjeta": "A",
                "EXP MM/YY": "10/19",
                CVV: '123',
                focus: "number"  
            }
            
            const invalidExp: PaymentInformationData = {
                "Número de tarjeta": "24242424242424",
                "Nombre como aparece en la tarjeta": "Abril",
                "EXP MM/YY": "1019",
                CVV: '123',
                focus: "number"
            }

            const invalidCVV: PaymentInformationData = {
                "Número de tarjeta": "24242424242424",
                "Nombre como aparece en la tarjeta": "Abril",
                "EXP MM/YY": "10/19",
                CVV: '1',
                focus: "number"
            }
                         

            it('should return false', async () => {
                expect(await PaymentSchema.isValid(invalidCardNumber)).toBeFalsy();
                expect(await PaymentSchema.isValid(invalidName)).toBeFalsy();
                expect(await PaymentSchema.isValid(invalidExp)).toBeFalsy();
                expect(await PaymentSchema.isValid(invalidCVV)).toBeFalsy();
            })
        })
    })

})
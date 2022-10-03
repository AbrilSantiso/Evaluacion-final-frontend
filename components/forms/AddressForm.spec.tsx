import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { useAddressInfoContext } from 'dh-marvel/context/AddressInfoContext';
import AddressForm, { addressSchema } from './AddressForm';


/*- ---------- Addres Information Context ------------*/
jest.mock("dh-marvel/context/AddressInfoContext");
const setAddressInfoMock = jest.fn();

const mockUseAddressInfo = useAddressInfoContext as jest.MockedFunction<typeof useAddressInfoContext>

mockUseAddressInfo.mockReturnValue({
    addressInfo: undefined,
    setAddressInfo: setAddressInfoMock
})

const handleNext = jest.fn();
const handleBack = jest.fn();

describe('Address Information form', () => {
   
    describe('when rendering the Address Information Form', () => {
        it('should render all the inputs', () => {
          
            render(
                <AddressForm handleNext={handleNext} handleBack={handleBack}/>
            )
            const address1 = screen.getByLabelText('Dirección')
            const address2 = screen.getByLabelText("Departamento")
            const city = screen.getByLabelText('Ciudad')
            const state = screen.getByLabelText('Provincia')
            const stateCode = screen.getByLabelText('Codigo Postal')
            expect(address1).toBeInTheDocument();
            expect(address2).toBeInTheDocument();
            expect(city).toBeInTheDocument()
            expect(state).toBeInTheDocument()
            expect(stateCode).toBeInTheDocument()
        })

        it('should call the handleNext function if all the inputs are filled', async () => {
          
            render(
                <AddressForm handleNext={handleNext} handleBack={handleBack}/>
            )
            const address1 = screen.getByLabelText('Dirección')
            const address2 = screen.getByLabelText("Departamento")
            const city = screen.getByLabelText('Ciudad')
            const state = screen.getByLabelText('Provincia')
            const stateCode = screen.getByLabelText('Codigo Postal')
            
            await userEvent.type(address1, "9 de julio")
            await userEvent.type(address2, "1 C")
            await userEvent.type(city, "Tigre")
            await userEvent.type(state, "Buenos Aires")
            await userEvent.type(stateCode, "1648")
            expect(address1).toHaveValue('9 de julio')
            await userEvent.click(screen.getByRole("button", { name: "Seguir" }));
            expect(handleNext).toBeCalledTimes(1)
        })
    })

    describe("Yup schemas", ()=>{
        describe('when validating a valid login schema', () => {
            it('should return true', async () => {
                
                expect(await addressSchema.isValid({
                    Dirección: "Anibal Gonzales",
                    //el departamento es opcional
                    Departamento: "",
                    Ciudad: "CABA",
                    Provincia: "Buenos Aires",
                    "Codigo Postal": "1648"
                })).toBeTruthy();
            })
        })
        describe('when validating an invalid login schema', () => {

            const invalidAddress1 = {
                Dirección: "",
                Departamento: "",
                Ciudad: "CABA",
                Provincia: "Buenos Aires",
                "Codigo Postal": "1648"
            }

            const invalidCity = {
                Dirección: "9 DE JULIO",
                Departamento: "1 D",
                Ciudad: "",
                Provincia: "Buenos Aires",
                "Codigo Postal": "1648"
            }

            const invalidCode = {
                Dirección: "9 DE JULIO",
                Departamento: "1 D",
                Ciudad: "CABA",
                Provincia: "Buenos Aires",
                "Codigo Postal": ""
            }

            const invalidState = {
                Dirección: "9 de julio",
                Departamento: "1 a",
                Ciudad: "CABA",
                Provincia: "",
                "Codigo Postal": "1648"
            }

            it('should return false', async () => {
                expect(await addressSchema.isValid(invalidAddress1)).toBeFalsy();
                expect(await addressSchema.isValid(invalidCity)).toBeFalsy();
                expect(await addressSchema.isValid(invalidCode)).toBeFalsy();
                expect(await addressSchema.isValid(invalidState)).toBeFalsy();
            })
        })
    })
})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { usePersonalInfoContext } from 'dh-marvel/context/PersonalInfoContext';
import PersonalInformationForm, { PersonalInformationData, personalInformationSchema } from './PersonalInformationForm';

/*- ---------- Mock Personal Information Context ------------*/

jest.mock("dh-marvel/context/PersonalInfoContext");
const setPersonalInfoMock = jest.fn();

const personalInformation = {
    Nombre: "Abril",
    Apellido: "Santiso",
    Email: "abrilsantiso@gmail.com"
}

const mockUsePersonalInfo = usePersonalInfoContext as jest.MockedFunction<typeof usePersonalInfoContext>

mockUsePersonalInfo.mockReturnValue({
    personalInfo: personalInformation,
    setPersonalInfo: setPersonalInfoMock
})

const handleNext = jest.fn();

describe('Personal Information form', () => {
   
    describe('when rendering the Personal Information Form', () => {
        it('should render the step 0 with all the inputs', () => {
          
            render(
                <PersonalInformationForm handleNext={handleNext}/>
            )
            const username = screen.getByLabelText('Nombre')
            const userLastName = screen.getByLabelText('Apellido')
            const email = screen.getByLabelText('Email')
            expect(username).toBeInTheDocument();
            expect(userLastName).toBeInTheDocument();
            expect(email).toBeInTheDocument()
        })

        it('should call the handleNext function if all the inputs are filled', async () => {
          
            render(
                <PersonalInformationForm handleNext={handleNext}/>
            )
            const username = screen.getByLabelText('Nombre')
            const userLastName = screen.getByLabelText('Apellido')
            const email = screen.getByLabelText('Email')
            
            await userEvent.type(username, "Abril")
            await userEvent.type(userLastName, "Santiso")
            await userEvent.type(email, "abrilsantiso@hotmail.com")
            expect(username).toHaveValue('Abril')
            await userEvent.click(screen.getByRole("button", { name: "Seguir" }));
            expect(handleNext).toBeCalledTimes(1)
        })
    })

    describe("Yup schemas", ()=>{
        describe('when validating a valid login schema', () => {
            it('should return true', async () => {
                
                expect(await personalInformationSchema.isValid({
                    Nombre: 'Abril',
                    Apellido: 'SAntiso',
                    Email: 'abrilsantiso@hotmail.com'  
                })).toBeTruthy();
            })
        })
        describe('when validating an invalid login schema', () => {

            const invalidEmailUser: PersonalInformationData = {
                Nombre: 'Abril',
                Apellido: 'SAntiso',
                Email: 'abrilhotmailcom'  
            }
            
            const invalidNameUser:  PersonalInformationData = {
                Nombre: 'Ab',
                Apellido: 'SAntiso',
                Email: 'abrilsantiso@hotmail.com'  
            }
            
            const invalidLastNameUser: PersonalInformationData = {
                Nombre: 'Abril',
                Apellido: 'SA',
                Email: 'abrilsantiso@hotmail.com'  
            }
                         

            it('should return false', async () => {
                expect(await personalInformationSchema.isValid(invalidEmailUser)).toBeFalsy();
                expect(await personalInformationSchema.isValid(invalidNameUser)).toBeFalsy();
                expect(await personalInformationSchema.isValid(invalidLastNameUser)).toBeFalsy();
            })
        })
    })
})
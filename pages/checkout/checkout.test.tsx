import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useOrderContext } from 'context/OrderContext';
import { PersonalInformationData, PersonalInformationFormProps } from 'dh-marvel/components/forms/PersonalInformationForm';
import CheckoutPage from './index.page';
import { OrderContext } from 'context/OrderContext';

const submittedData: PersonalInformationData = {
    Email: 'abru@a.com',
    Apellido: 'Santiso',
    Nombre: 'Abril',
}
const mockPersonalInfoFormProps = jest.fn();

jest.mock('dh-marvel/components/forms/PersonalInformationForm', () => jest.fn((props: PersonalInformationFormProps) => {
 
    mockPersonalInfoFormProps(props);

    // Renderizamos un mock (lo mas simple que se pueda)
    return <div onClick={() => props.handleNext()}>
        Información Personal
    </div>
}))
;
/*
 */


// jest.mock("dh/components/forms", () => ({
//     RegisterForm: jest.fn((props: RegisterFormProps) => {
//             // Invocamos nuestra funcion mock de jest, para validar los parametros
//             mockRegisterFormProps(props);
//
//             // Renderizamos un mock (lo mas simple que se pueda)
//             return <div onClick={() => props.handleNext(submittedData)}>
//                 RegisterForm
//             </div>
//         },
//         // SegundoForm: jest.fn(() => {
//         //
//         // })
//     )
// }))
const setOrderMock = jest.fn();
const order = {
    id: 1,
    title: "Hulk",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.",
      extension: "jpg"
    },
    description: "description",
    price: 3,
    oldPrice: 4,
    stock: 5,
    characters: {
      available: 0,
      items: []
    }
  }

const mockUseOrder = useOrderContext as jest.MockedFunction<typeof useOrderContext>

mockUseOrder.mockReturnValue({
    order: order ,
    setOrder: setOrderMock
})




describe('CheckoutPage', () => {
    describe('when rendering default form', () => {
        it('should render the step 0 with the Personal Information Form', () => {
            render(
                <OrderContext.Provider value={mockUseOrder()}>
            <CheckoutPage/>
            </OrderContext.Provider>
            )
            const form = screen.getByText('Información Personal')
            expect(form).toBeInTheDocument()

            expect(mockPersonalInfoFormProps).toBeCalledWith(
                expect.objectContaining({activeStep: 0})
            )
        })
    })/*
    describe('when submitting register form', () => {
        it('should not render RegisterForm', async () => {
            render(<StepperForm/>)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
        })
        it('should render Finished message', async () => {
            render(<StepperForm/>)
            const form = screen.getByText('RegisterForm')
            await userEvent.click(form);
            expect(await screen.findByText('CreditCardForm')).toBeInTheDocument();
        })
        describe('when submitting credit card form', () => {
            it('should not render RegisterForm neither CreditCardForm', async () => {
                render(<StepperForm/>)
                const form = screen.getByText('RegisterForm')
                await userEvent.click(form);

                const creditCardForm = screen.getByText('CreditCardForm')
                await userEvent.click(creditCardForm);

                expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
                expect(screen.queryByText('CreditCardForm')).not.toBeInTheDocument();
            })
            it('should render Finished message', async () => {
                render(<StepperForm/>)
                
                const form = screen.getByText('RegisterForm')
                await userEvent.click(form);

                const creditCardForm = screen.getByText('CreditCardForm')
                await userEvent.click(creditCardForm);

                expect(await screen.findByText('Finalizado')).toBeInTheDocument();
            })
        })
    })
    */
})
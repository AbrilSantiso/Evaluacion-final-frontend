import { render, screen } from '@testing-library/react'
import { useOrderContext } from 'dh-marvel/context/OrderContext';
import { usePersonalInfoContext } from 'dh-marvel/context/PersonalInfoContext';
import {
    useAddressInfoContext
} from 'dh-marvel/context/AddressInfoContext';

import {

    PersonalInformationFormProps
} from 'dh-marvel/components/forms/PersonalInformationForm';
import CheckoutPage from './index.page';
import userEvent from '@testing-library/user-event';
import { AddressFormProps } from 'dh-marvel/components/forms/AddressForm';
import { PaymentFormProps, PaymentInformationData } from 'dh-marvel/components/forms/PaymentForm';
import { server } from 'dh-marvel/test/server';
import { useRouter } from 'next/router'


beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

/*------ Mock Router ---- */
jest.mock("next/router",()  => ({    
    useRouter: jest.fn(() => {
        return {
            route: "/",
            pathname: "/",
            query: {},
            asPath: "/",
            push: jest.fn()          
        }
    })
}));
/* Mock Step 1: Personal Information Form */

const mockPersonalInfoFormProps = jest.fn();

jest.mock('dh-marvel/components/forms/PersonalInformationForm', () => jest.fn((props: PersonalInformationFormProps) => {

    mockPersonalInfoFormProps(props);
    return <div onClick={() => props.handleNext()}>
        Información Personal
    </div>
}))

/* Mock Step 2: Address Information Form */

const mockAddressInfoFormProps = jest.fn();

jest.mock('dh-marvel/components/forms/AddressForm', () => jest.fn((props: AddressFormProps) => {

    mockAddressInfoFormProps(props);
    return <div>
        Formulario de dirección de entrega
        <button onClick={() => props.handleBack()}>Anterior</button>
        <button onClick={() => props.handleNext()}>Siguiente</button>
    </div>
}))

/* Mock Step 3: Payment Information Form */

const mockPaymentInfoFormProps = jest.fn();

jest.mock('dh-marvel/components/forms/PaymentForm', () => jest.fn((props: PaymentFormProps) => {

    mockPaymentInfoFormProps(props);

    const incorrectPaymentData: PaymentInformationData = {
        "Número de tarjeta": "1111111111111111",
        "Nombre como aparece en la tarjeta": "Abril",
        "EXP MM/YY": "11/11",
        CVV: "123",
        focus: "number"
    }

    const withoutFundsCard: PaymentInformationData = {
        "Número de tarjeta":  '4111 4111 4111 4111'.replace(" ", ""),
        "Nombre como aparece en la tarjeta": "Abril",
        "EXP MM/YY": "11/11",
        CVV: "123",
        focus: "number"
    }

    const withoutAuthorizationCard: PaymentInformationData = {
        "Número de tarjeta":  '4000 4000 4000 4000'.replace(" ", ""),
        "Nombre como aparece en la tarjeta": "Abril",
        "EXP MM/YY": "11/11",
        CVV: "123",
        focus: "number"
    }

    const correctPaymentData: PaymentInformationData = {
        "Número de tarjeta": "4242424242424242",
        "Nombre como aparece en la tarjeta": "Abril",
        "EXP MM/YY": "11/11",
        CVV: "123",
        focus: "number"
    }

    const { order } = useOrderContext();

    const paymentData = order?.title === "Hulk Comic" ? incorrectPaymentData : order?.title === "withoutFundsCard" ? withoutFundsCard : order?.title === "withoutAuthorizationCard" ? withoutAuthorizationCard :  correctPaymentData;


    return <div>
        Payment Form
        <button onClick={() => props.handleBack()}>Anterior</button>
        <button onClick={() => props.handleNext(paymentData)}>Siguiente</button>
    </div>

}))


/*-------------------- Mocks de Contexts --------------------*/

/*- ---------- Order Context ------------*/

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

jest.mock("dh-marvel/context/OrderContext");

const mockUseOrder = useOrderContext as jest.MockedFunction<typeof useOrderContext>


/*- ---------- Personal Information Context ------------*/
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


/*- ---------- Addres Information Context ------------*/
jest.mock("dh-marvel/context/AddressInfoContext");
const setAddressInfoMock = jest.fn();

const mockUseAddressInfo = useAddressInfoContext as jest.MockedFunction<typeof useAddressInfoContext>

mockUseAddressInfo.mockReturnValue({
    addressInfo: undefined,
    setAddressInfo: setAddressInfoMock
})




describe('CheckoutPage', () => {
    describe('when rendering default form', () => {
        it('should render a message with "No hay comics en tu carrito" text', () => {
            mockUseOrder.mockReturnValue({
                order: undefined,
                setOrder: setOrderMock
            })
            render(
                <CheckoutPage />
            )
            const message = screen.getByText('No tienes ningún comic en tu carrito')
            expect(message).toBeInTheDocument()

        })
    })
    describe('when rendering default form', () => {
        it('should render the step 0 with the Personal Information Form', () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })
            render(
                <CheckoutPage />
            )
            const form = screen.getByText('Información Personal')
            expect(form).toBeInTheDocument()

            expect(mockPersonalInfoFormProps).toBeCalledWith(
                expect.objectContaining({
                    handleNext: expect.any(Function)
                })
            )
        })
    })
    describe('when submitting register form', () => {
        it('should not render RegisterForm', async () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const form = screen.getByText('Información Personal')
            await userEvent.click(form);
            expect(screen.queryByText('Información Personal')).not.toBeInTheDocument();
        })
        it('should render AddressInfo form', async () => {
            render(<CheckoutPage />)
            const form = screen.getByText('Información Personal')
            await userEvent.click(form);
            expect(await screen.findByText('Formulario de dirección de entrega')).toBeInTheDocument();
        })
    })

    describe('when clicking the "Anterior" button on AddressInfo form', () => {
        mockUseOrder.mockReturnValue({
            order: order,
            setOrder: setOrderMock
        })
        it('should not render AdressInfo form anymore', async () => {
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal')
            await userEvent.click(PersonalInfoform);

            const AddressInfoForm = screen.getByText('Formulario de dirección de entrega')
            expect(AddressInfoForm).toBeInTheDocument();

            const goBackButton = screen.getByText('Anterior')
            await userEvent.click(goBackButton);

            expect(AddressInfoForm).not.toBeInTheDocument();
        })

        it('should  render the PersonalInformation Form again', async () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal')
            await userEvent.click(PersonalInfoform);

            const AddressInfoForm = screen.getByText('Formulario de dirección de entrega')
            expect(AddressInfoForm).toBeInTheDocument();
            expect(PersonalInfoform).not.toBeInTheDocument();

            const goBackButton = screen.getByText('Anterior')
            await userEvent.click(goBackButton);

            expect(await screen.findByText('Información Personal')).toBeInTheDocument();
        })
    })

    describe('when clicking the "Siguiente" button on AddressInfo form', () => {
        mockUseOrder.mockReturnValue({
            order: order,
            setOrder: setOrderMock
        })
        it('should not render AdressInfo form anymore', async () => {
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const AddressInfoForm = screen.getByText('Formulario de dirección de entrega');

            expect(AddressInfoForm).toBeInTheDocument();

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(AddressInfoForm).not.toBeInTheDocument();
        })

        it('should render the Payment form', async () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const AddressInfoForm = screen.getByText('Formulario de dirección de entrega');

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(AddressInfoForm).not.toBeInTheDocument();
            expect(await screen.findByText('Payment Form')).toBeInTheDocument();
        })
    })

    describe('when clicking the "Siguiente" button on PaymentInfo form', () => {

        it('should render an error message if the credit card info is not correct', async () => {
            mockUseOrder.mockReturnValue({
                order: {
                    id: 1,
                    title: "Hulk Comic",
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
                },
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);

            expect(await screen.findByText("Datos de tarjeta incorrecta")).toBeInTheDocument();
        })

        it('should render an error message if the address info is not correct', async () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })

            mockUseAddressInfo.mockReturnValue({
                addressInfo: {
                  Dirección: "9 de julio",
                  Departamento: "invalid",
                  Ciudad: "Tigre",
                  Provincia: "Buenos Aires",
                  "Codigo Postal": "123"
                },
                setAddressInfo: setAddressInfoMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);

            expect(await screen.findByText("Dirección de entrega incorrecta")).toBeInTheDocument();
        })

        it('should render a server error message if the address info is not correct', async () => {
            mockUseOrder.mockReturnValue({
                order: order,
                setOrder: setOrderMock
            })

            mockUseAddressInfo.mockReturnValue({
                addressInfo: {
                  Dirección: "9 de julio",
                  Departamento: "error del servidor",
                  Ciudad: "Tigre",
                  Provincia: "Buenos Aires",
                  "Codigo Postal": "123"
                },
                setAddressInfo: setAddressInfoMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);
            
            expect(await screen.findByTestId("error-bar")).toBeInTheDocument();
            expect(await screen.findByText("Error de servidor. Intente nuevamente")).toBeInTheDocument();
        })

        it('should render an error message if the card does not have funds', async () => {

            mockUseAddressInfo.mockReturnValue({
                addressInfo: {
                  Dirección: "9 de julio",
                  Departamento: "A 1",
                  Ciudad: "Tigre",
                  Provincia: "Buenos Aires",
                  "Codigo Postal": "123"
                },
                setAddressInfo: setAddressInfoMock
            })

            mockUseOrder.mockReturnValue({
                order: {
                    id: 1,
                    title: "withoutFundsCard",
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
                },
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);

            expect(await screen.findByText("Tarjeta sin fondos disponibles")).toBeInTheDocument();
        })



        it('should render an error message if the card does not have funds', async () => {

            mockUseAddressInfo.mockReturnValue({
                addressInfo: {
                  Dirección: "9 de julio",
                  Departamento: "A 1",
                  Ciudad: "Tigre",
                  Provincia: "Buenos Aires",
                  "Codigo Postal": "123"
                },
                setAddressInfo: setAddressInfoMock
            })

            mockUseOrder.mockReturnValue({
                order: {
                    id: 1,
                    title: "withoutAuthorizationCard",
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
                },
                setOrder: setOrderMock
            })
            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);

            expect(await screen.findByText("Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.")).toBeInTheDocument();
        })


        it('should call useRouter.push() if the credit card info is correct', async () => {

            render(<CheckoutPage />)
            const PersonalInfoform = screen.getByText('Información Personal');
            await userEvent.click(PersonalInfoform);

            const nextButton = screen.getByText('Siguiente')

            await userEvent.click(nextButton);

            expect(await screen.findByText('Payment Form')).toBeInTheDocument();

            const nextButtonOnPaymentScreen = screen.getByText('Siguiente')

            await userEvent.click(nextButtonOnPaymentScreen);

            expect(useRouter).toHaveBeenCalled();
        })

    })

})
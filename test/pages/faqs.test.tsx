import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {faqsData} from "dh-marvel/components/faqs/faqsData";
import Faqs from "../../pages/preguntas-frecuentes/index.page";


describe('FAQs Page', () => {
    describe('When rendering FAQs page', () => {
        it('should render the faqs page title', () => {
            render(<Faqs/>)
            const title = screen.getByText('Preguntas frecuentes')
            expect(title).toBeInTheDocument();
        })
        it('should render an accordion for each FAQ', () => {
            render(<Faqs/>)
            const faqsContainer = screen.getByTestId('faqs-container')
            const faqs = faqsContainer.childElementCount;
            expect(faqs).toBe(faqsData.length);
        })
        
    })
   
})
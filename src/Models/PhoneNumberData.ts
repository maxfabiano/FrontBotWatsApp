interface PhoneNumberData {
    data: {
        verified_name: string;
        code_verification_status: string;
        display_phone_number: string;
        quality_rating: string;
        platform_type: string;
        throughput: {
            level: string;
        };
        webhook_configuration: {
            application: string;
        };
        id: string;
    }[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
}

class PhoneNumberService {
    public getPhoneNumberIdByDisplayPhoneNumber(
        displayPhoneNumber: string,
        phoneNumberDataString: string
    ): string | null {
        try {
            const phoneNumberData: PhoneNumberData = JSON.parse(phoneNumberDataString);

            for (const phone of phoneNumberData.data) {
                if (phone.display_phone_number === displayPhoneNumber) {
                    return phone.id;
                }
            }
        } catch (error) {
            console.error("Erro ao analisar os dados do telefone:", error);
        }

        return null;
    }
}

export default new PhoneNumberService();
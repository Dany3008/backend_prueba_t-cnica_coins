import { CompaniesService } from './companies/companies.service';
export declare class AppController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    allCompanies(): Promise<import("./companies/company.entity").Company[]>;
    testCompanyConnection(): Promise<{
        status: string;
        data: import("./companies/company.entity").Company;
    }>;
}

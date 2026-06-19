import LeadList from"../../../components/admin/leads/LeadList.jsx";import{inquiryService}from"../../../services/inquiryService.js";
export default function InquiryListPage(){return <LeadList title="Contact enquiries" description="Messages sent through the website contact form." basePath="/admin/inquiries" loadItems={inquiryService.getInquiries} detailKey="subject"/>}

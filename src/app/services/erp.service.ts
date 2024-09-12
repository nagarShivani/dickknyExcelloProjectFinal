import { Injectable } from "@angular/core";
import { ApiService } from "./service";
import { Observable } from "rxjs";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class ErpService extends ApiService {
  // localpath:any = `http://localhost:3000`;
  // localpath: any = `https://dickkny.vercel.app`;
  // localpath: any = "http://157.173.221.56:3000";
  localpath: any = "https://backend.dickkny.com";

  signUpUser(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/signup`,
      method: "POST",
      body,
    });
  }
  logInUser(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/login`,
      method: "POST",
      body,
    });
  }

  GetCountsAdmin() {
    return this.request({
      path: `${this.localpath}/admin/getCount`,
      method: "GET",
    });
  }
  GetAllEmployees() {
    return this.request({
      path: `${this.localpath}/getAllUsersList`,
      method: "GET",
    });
  }
  getleaveListOfEmployee(id: any) {
    return this.request({
      path: `${this.localpath}/getAllLeaveRequestById/${id}`,
      method: "GET",
    });
  }
  getAllNotificationForParticularReceiverId(id: any) {
    return this.request({
      path: `${this.localpath}/getAllNotificationForParticularReceiverId/${id}`,
      method: "GET",
    });
  }
  getAllOrders() {
    return this.request({
      path: `${this.localpath}/getAllOrders`,
      method: "GET",
    });
  }
  GetAllLeaveList() {
    return this.request({
      path: `${this.localpath}/getAllLeaveRequests`,
      method: "GET",
    });
  }
  GetAllDesignations() {
    return this.request({
      path: `${this.localpath}/getAllDesignation`,
      method: "GET",
    });
  }
  GetAllDepartments() {
    return this.request({
      path: `${this.localpath}/getAllDepartment`,
      method: "GET",
    });
  }

  GetAllEvents() {
    return this.request({
      path: `${this.localpath}/getevents`,
      method: "GET",
    });
  }
  getAllUsers() {
    return this.request({
      path: `${this.localpath}/getAllUsers`,
      method: "GET",
    });
  }
  getAllProduct() {
    return this.request({
      path: `${this.localpath}/getAllProduct`,
      method: "GET",
    });
  }
  getAllBlog() {
    return this.request({
      path: `${this.localpath}/getAllBlog`,
      method: "GET",
    });
  }
  getAllBills() {
    return this.request({
      path: `${this.localpath}/getAllBills`,
      method: "GET",
    });
  }
  getAllRating() {
    return this.request({
      path: `${this.localpath}/getAllRating`,
      method: "GET",
    });
  }
  getAllCoupons() {
    return this.request({
      path: `${this.localpath}/getAllCoupons`,
      method: "GET",
    });
  }
  getAllCategory() {
    return this.request({
      path: `${this.localpath}/getAllCategoryforAdmin`,
      method: "GET",
    });
  }
  getAllBrand() {
    return this.request({
      path: `${this.localpath}/getAllBrand`,
      method: "GET",
    });
  }

  getAllsize() {
    return this.request({
      path: `${this.localpath}/getAllsize`,
      method: "GET",
    });
  }

  GetAllWorkFromListForEmployee(id: any) {
    return this.request({
      path: `${this.localpath}/getAllWFHRequestByEmployeeId/${id}`,
      method: "GET",
    });
  }

  GetAllWorkFromHomeList() {
    return this.request({
      path: `${this.localpath}/getAllWFHRequests`,
      method: "GET",
    });
  }
  checkLocation() {
    return this.request({
      path: `${this.localpath}/checklocation`,
      method: "GET",
    });
  }
  GetAllEmployeesDsr() {
    return this.request({
      path: `${this.localpath}/getalltask`,
      method: "GET",
    });
  }
  GetAllEmployeesDsrForEmployee(id: any) {
    return this.request({
      path: `${this.localpath}/getalltaskofEmployee/${id}`,
      method: "GET",
    });
  }
  getAllBrandById(id: any) {
    return this.request({
      path: `${this.localpath}/getAllBrandById/${id}`,
      method: "GET",
    });
  }
  // user by id add
  getAllUsersById(id: any) {
    return this.request({
      path: `${this.localpath}/getAllUsersById/${id}`,
      method: "GET",
    });
  }
  getAllPunchinsbyids(id: any) {
    return this.request({
      path: `${this.localpath}/getallpunchinsbyid/${id}`,
      method: "GET",
    });
  }

  deleteEmployee(id: any) {
    return this.request({
      path: `${this.localpath}/deleteuser/${id}`,
      method: "DELETE",
    });
  }

  deleteDepartment(id: any) {
    return this.request({
      path: `${this.localpath}/deleteDepartment/${id}`,
      method: "DELETE",
    });
  }
  deleteDesignation(id: any) {
    return this.request({
      path: `${this.localpath}/deleteDesignation/${id}`,
      method: "DELETE",
    });
  }
  deleteRating(id: any) {
    return this.request({
      path: `${this.localpath}/deleteRating/${id}`,
      method: "DELETE",
    });
  }
  deleteBill(id: any) {
    return this.request({
      path: `${this.localpath}/deleteBill/${id}`,
      method: "DELETE",
    });
  }
  deleteCoupon(id: any) {
    return this.request({
      path: `${this.localpath}/deleteCoupon/${id}`,
      method: "DELETE",
    });
  }
  deleteCategory(id: any) {
    return this.request({
      path: `${this.localpath}/deleteCategory/${id}`,
      method: "DELETE",
    });
  }
  // not present before task
  deleteColor(id: any) {
    return this.request({
      path: `${this.localpath}/deleteColor/${id}`,
      method: "DELETE",
    });
  }
  deletesize(id: any) {
    return this.request({
      path: `${this.localpath}/deletesize/${id}`,
      method: "DELETE",
    });
  }
  deleteBrand(id: any) {
    return this.request({
      path: `${this.localpath}/deleteBrand/${id}`,
      method: "DELETE",
    });
  }

  // delete User
  deleteUser(id: any) {
    return this.request({
      path: `${this.localpath}/deleteUser/${id}`,
      method: "DELETE",
    });
  }
  deleteBlog(id: any) {
    return this.request({
      path: `${this.localpath}/deleteBlog/${id}`,
      method: "DELETE",
    });
  }

  deleteProduct(id: any) {
    return this.request({
      path: `${this.localpath}/deleteProduct/${id}`,
      method: "DELETE",
    });
  }
  deleteEvent(id: any) {
    return this.request({
      path: `${this.localpath}/deleteeventsdetails/${id}`,
      method: "DELETE",
    });
  }
  deletewfh(id: any) {
    return this.request({
      path: `${this.localpath}/deletewfhdetails/${id}`,
      method: "DELETE",
    });
  }
  deleteDSr(id: any) {
    return this.request({
      path: `${this.localpath}/deleteuserTask/${id}`,
      method: "DELETE",
    });
  }

  deleteLeaves(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/deleteLeaveRequest/${id}`,
      method: "DELETE",
      body,
    });
  }

  getLeavesDetails(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/user/getLeavesDetails`,
      method: "POST",
      body,
    });
  }
  AskForReview(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/NotificationForRatingAndReview`,
      method: "POST",
      body,
    });
  }
  terminateUser(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/terminateEmployee`,
      method: "POST",
      body,
    });
  }
  ChangePassword(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/ChangePassword`,
      method: "POST",
      body,
    });
  }
  getAllpaidAndUnpaid(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/getpaidandunpaidleaves`,
      method: "POST",
      body,
    });
  }
  forgetpassword(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/forgot`,
      method: "POST",
      body,
    });
  }
  resetpassword(data: any, id: any, token: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/reset/${id}/${token}`,
      method: "POST",
      body,
    });
  }
  addPunchIn(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addPunchIn/${id}`,
      method: "POST",
      body,
    });
  }
  addPunchOut(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/punchOut/${id}`,
      method: "PUT",
      body,
    });
  }
  updateLeaveAllowanceStatus(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/UpdateLeaveAllowanceStatus/${id}`,
      method: "PUT",
      body,
    });
  }
  updateLeaveRequestStatus(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/updateLeaveRequestStatus/${id}`,
      method: "PUT",
      body,
    });
  }
  TeamLead(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/TeamLead`,
      method: "POST",
      body,
    });
  }
  addEmployee(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addNewUser`,
      method: "POST",
      body,
    });
  }
  getallLeaveAllowanceRequestsByEmployeeId(id: any) {
    return this.request({
      path: `${this.localpath}/getallLeaveAllowanceRequestsByEmployeeId/${id}`,
      method: "GET",
    });
  }
  getallLeaveAllowanceRequests() {
    return this.request({
      path: `${this.localpath}/getallLeaveAllowanceRequests`,
      method: "GET",
    });
  }
  getAllcolor() {
    return this.request({
      path: `${this.localpath}/getAllcolor`,
      method: "GET",
    });
  }
  getPunchInAndPunchOutforAdminAllDate() {
    return this.request({
      path: `${this.localpath}/getAllPunches`,
      method: "GET",
    });
  }
  getAllExEmployeeList() {
    return this.request({
      path: `${this.localpath}/getAllExEmployeesList`,
      method: "GET",
    });
  }

  // getAllExEmployeeList() {
  //   return this.request({
  //       path:`${this.localpath}/Exemployee`,
  //       method:"GET",
  //     });
  //   }
  getPunchInAndPunchOutByEmployeeId(id: any) {
    return this.request({
      path: `${this.localpath}/getPunchInAndPunchOutByEmployeeId/${id}`,
      method: "GET",
    });
  }
  userlocation(data: any, id: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/post/${id}`,
      method: "POST",
      body,
    });
  }
  addcolor(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addcolor`,
      method: "POST",
      body,
    });
  }
  addDsr(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addTask`,
      method: "POST",
      body,
    });
  }
  addleaveallowance(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/AddLeaveAllowance`,
      method: "POST",
      body,
    });
  }
  addleaveRequest(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addLeaveRequest`,
      method: "POST",
      body,
    });
  }
  addwfh(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/WFHRequest`,
      method: "POST",
      body,
    });
  }
  addDepartment(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addDepartment`,
      method: "POST",
      body,
    });
  }
  addDesignation(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addDesignation`,
      method: "POST",
      body,
    });
  }
  addProduct(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addProduct`,
      method: "POST",
      body,
    });
  }
  addBlog(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addBlog`,
      method: "POST",
      body,
    });
  }
  createCoupon(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/createCoupon`,
      method: "POST",
      body,
    });
  }
  addCategory(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addCategory`,
      method: "POST",
      body,
    });
  }
  addBrand(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addBrand`,
      method: "POST",
      body,
    });
  }
  addsize(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addsize`,
      method: "POST",
      body,
    });
  }
  addEvent(data: any) {
    const { body } = data;
    return this.request({
      path: `${this.localpath}/addevent`,
      method: "POST",
      body,
    });
  }
  getNoofLeaveForEmployee(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllEmpLeaveRequestByEmpID/${id}`,
      method: "GET",
      body,
    });
  }
  getLeaveRequestByEmployeeData(id: any, objid: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getLeaveRequestByEmployeeData/${id}/${objid}`,
      method: "GET",
      body,
    });
  }
  Editwfh(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllWFHRequestById/${id}`,
      method: "GET",
      body,
    });
  }
  getAllProductsById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllProductsById/${id}`,
      method: "GET",
      body,
    });
  }
  getAllBlogById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllBlogById/${id}`,
      method: "GET",
      body,
    });
  }
  getCouponById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getCouponById/${id}`,
      method: "GET",
      body,
    });
  }
  getAllCategoryById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllCategoryById/${id}`,
      method: "GET",
      body,
    });
  }
  // getUserDetailById
  getUserDetailById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getUserDetailById/${id}`,
      method: "GET",
      body,
    });
  }
  getAllcolorById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllcolorById/${id}`,
      method: "GET",
      body,
    });
  }
  getAllsizeById(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllsizeById/${id}`,
      method: "GET",
      body,
    });
  }
  EditEvent(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllEventsbyid/${id}`,
      method: "GET",
      body,
    });
  }
  EditDepartment(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllDepartmentById/${id}`,
      method: "GET",
      body,
    });
  }
  EditDesignation(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllDesignationById/${id}`,
      method: "GET",
      body,
    });
  }
  getLateEmployeeList() {
    return this.request({
      path: `${this.localpath}/getConsistentlyLateEmployees`,
      method: "GET",
    });
  }
  getEmployeesByPunctualityStatus(data: any) {
    return this.request({
      path: `${this.localpath}/getEmployeesByPunctualityStatus?status=${data}`,
      method: "GET",
    });
  }
  getLateEmployeesListOfToday() {
    return this.request({
      path: `${this.localpath}/getLateEmployeesListOfToday`,
      method: "GET",
    });
  }
  getallLeaveEmployee() {
    return this.request({
      path: `${this.localpath}/getallLeaveEmployee`,
      method: "GET",
    });
  }
  EditDsr(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllTaskListById/${id}`,
      method: "GET",
      body,
    });
  }
  EditEmployee(id: any) {
    const { body } = id;
    return this.request({
      path: `${this.localpath}/getAllUsersListById/${id}`,
      method: "GET",
      body,
    });
  }
  UpdateEmployee(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateUser/${id}`,
      method: "PUT", // Use PUT method
      body: data, // Pass the data as the body of the request
    });
  }
  UpdateDsr(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateTask/${id}`,
      method: "PUT",
      body: data,
    });
  }
  UpdateDepartment(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateDepartment/${id}`,
      method: "PUT",
      body: data,
    });
  }
  UpdateDesignation(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateDesignation/${id}`,
      method: "PUT",
      body: data,
    });
  }

  updateProduct(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateProduct/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateBlog(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateBlog/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateCategory(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateCategory/${id}`,
      method: "PUT",
      body: data,
    });
  }
  // updateUserDetail
  updateUserDetails(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateUserDetails/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateBrand(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateBrand/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updatecolor(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updatecolor/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updatesize(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updatesize/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateCoupon(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateCoupon/${id}`,
      method: "PUT",
      body: data,
    });
  }
  UpdateEvent(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateeventsdetails/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateWFHStatus(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateWFHStatus/${id}`,
      method: "PUT",
      body: data,
    });
  }
  Updatewfh(id: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateWFHRequest/${id}`,
      method: "PUT",
      body: data,
    });
  }
  updateLeaveRequest(id: any, monthdate: any, data: any) {
    return this.request({
      path: `${this.localpath}/updateLeaveRequest/${id}/${monthdate}`,
      method: "PUT",
      body: data,
    });
  }
}

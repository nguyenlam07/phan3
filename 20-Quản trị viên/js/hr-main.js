// Mock Data cho Quản lý Nhân sự (Người 3)
const employeesData = [
    { id: 1, name: "Nguyễn Văn A", email: "anguyen@company.com", dept: "IT", mentor: "Trần Văn X", joinDate: "20/10/2026", progress: 60 },
    { id: 2, name: "Nguyễn Văn B", email: "bnguyen@company.com", dept: "IT", mentor: "Trần Văn X", joinDate: "22/10/2026", progress: 30 },
    { id: 3, name: "Lê Thị C", email: "cle@company.com", dept: "Marketing", mentor: "Phạm Thị Y", joinDate: "18/10/2026", progress: 45 },
    { id: 4, name: "Phạm Minh D", email: "dpham@company.com", dept: "HR", mentor: "Hoàng Văn Z", joinDate: "15/10/2026", progress: 100 }
];

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("employee-table-body");
    const searchInput = document.getElementById("search-input");
    const deptFilter = document.getElementById("dept-filter");

    // 1. Hàm hiển thị danh sách nhân viên (dùng cho trang hr-employees.html)
    function renderEmployees(data) {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        data.forEach(emp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="avatar-circle">${emp.name.charAt(0)}</div>
                        <div>
                            <strong>${emp.name}</strong><br>
                            <small class="text-muted">${emp.email}</small>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-light text-dark">${emp.dept}</span></td>
                <td>${emp.mentor}</td>
                <td>${emp.joinDate}</td>
                <td>
                    <div class="progress" style="height: 8px; width: 100px;">
                        <div class="progress-bar bg-primary" style="width: ${emp.progress}%"></div>
                    </div>
                    <small>${emp.progress}%</small>
                </td>
                <td>
                    <button class="btn btn-sm btn-light btn-edit" title="Sửa"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-sm btn-light text-danger btn-delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Khởi chạy render dữ liệu nếu có bảng nhân viên
    if (tableBody) {
        renderEmployees(employeesData);
    }

    // 2. Xử lý Lọc & Tìm kiếm nhân viên
    if (searchInput && deptFilter) {
        function filterData() {
            const keyword = searchInput.value.toLowerCase();
            const selectedDept = deptFilter.value;

            const filtered = employeesData.filter(emp => {
                const matchesSearch = emp.name.toLowerCase().includes(keyword) || emp.email.toLowerCase().includes(keyword);
                const matchesDept = selectedDept === "" || emp.dept === selectedDept;
                return matchesSearch && matchesDept;
            });

            renderEmployees(filtered);
        }

        searchInput.addEventListener("input", filterData);
        deptFilter.addEventListener("change", filterData);
    }

    // 3. XỚ LÝ SỰ KIỆN CLICK CHO TẤT CẢ CÁC NÚT BẤM TRÊN TRANG
    document.addEventListener("click", function (event) {
        const targetBtn = event.target.closest("button");
        if (!targetBtn) return;

        const btnText = targetBtn.innerText.trim();

        // Nút "Phân tích lại" của AI trên trang Dashboard
        if (targetBtn.id === "btn-reanalyze") {
            alert("🤖 AI đang tiến hành quét lại dữ liệu tiến độ toàn hệ thống...");
            return;
        }

        // Các nút hành động AI Risk hoặc Thêm mới nhân sự / Quy trình
        if (btnText.includes("Gửi email") || btnText.includes("Giao Mentor") || btnText.includes("Thêm nhân sự mới") || btnText.includes("Tạo quy trình mới") || btnText.includes("Chỉnh sửa bước")) {
            alert(`✅ Đã kích hoạt chức năng: "${btnText}" thành công!`);
            return;
        }

        // Nút Sửa nhân viên trong bảng
        if (targetBtn.classList.contains("btn-edit") || targetBtn.querySelector(".fa-pen")) {
            alert("✏️ Mở hộp thoại chỉnh sửa thông tin nhân sự.");
            return;
        }

        // Nút Xóa nhân viên trong bảng
        if (targetBtn.classList.contains("btn-delete") || targetBtn.querySelector(".fa-trash")) {
            if (confirm("⚠️ Bạn có chắc chắn muốn xóa nhân sự này khỏi hệ thống không?")) {
                alert("🗑️ Đã xóa nhân sự thành công!");
            }
            return;
        }
    });
});
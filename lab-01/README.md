LAB-01: Functional Component và Class component
- ChildComponent: Fucntional Component con được import bởi Component khác, chỉ trả về React Element
- ParentComponent: Component Cha import ChildComponent, là 1 Class Component, có phương thức khởi tạo, render(), phương thức hủy, ...
- Khi 1 componet như App import ParentComponent nó sẽ chứa cả 2 component trên do ParentComponent có import ChildComponent.
LAB-02:
LifeCycle: Chứa các Phương thức thao tác khi component sẽ được mount, đã được Mount, và khi sắp bị Unmount.
Khi nhấn nút Show a cat fact thì sẽ in ra theo thứ tự sau:
- Component Will Mount
- Component Mounted 
Sau đó khi nhấn close sẽ in ra 
- Component will Unmount
Nếu nhấn Show another cat fact để lấy fact mới, sẽ remount component và in ra theo thứ tự sau:
- Component Will Mount   ← instance MỚI được tạo
- Component will Unmount ← instance CŨ bị gỡ
- Component Mounted      ← instance MỚI hoàn tất mount

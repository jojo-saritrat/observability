# ใช้ base image ขนาดเล็กที่มี shell พื้นฐาน
FROM alpine:latest

# ติดตั้ง curl เนื่องจาก alpine base image ไม่มีมาให้โดย default
RUN apk add --no-cache curl

# คัดลอก script ของเราเข้าไปใน container
COPY run.sh /run.sh

# ทำให้ script สามารถรันได้ (executable)
RUN chmod +x /run.sh

# กำหนดให้รัน script นี้เมื่อ container เริ่มทำงาน
CMD ["/run.sh"]
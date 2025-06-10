package in.anshul.billingSoftware.io;

import jakarta.persistence.Embeddable;

@Embeddable
public class PaymentDetails {

    private PaymentStatus status;

    public PaymentDetails() {
        this.status = PaymentStatus.COMPLETED;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED;

        PaymentStatus() {
        }
    }

}

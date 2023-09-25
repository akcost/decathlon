package model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "results")

public class Result {

    @Id
    @SequenceGenerator(name = "my_seq", sequenceName = "seq1", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq")
    private Long id;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(name = "event_name")
    @Size(min = 2, max = 50)
    private EventName eventName;

    @NonNull
    @Column(name = "result_value")
    private Double resultValue;

    @Column(name = "points")
    private Integer points;

}

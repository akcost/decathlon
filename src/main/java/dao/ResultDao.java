package dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import model.Result;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ResultDao {

    @PersistenceContext
    private EntityManager em;

    public List<Result> findAll() {
        return em.createQuery("select p from Result p").getResultList();
    }
}

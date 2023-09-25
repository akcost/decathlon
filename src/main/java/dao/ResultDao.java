package dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import model.Result;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ResultDao {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public Result save(Result result) {
        if (result.getId() == null) {
            em.persist(result);
        } else {
            em.merge(result);
        }

        return result;
    }

    public List<Result> findAll() {
        return em.createQuery("select p from Result p").getResultList();
    }

    public Result findResultById(Long id) {
        return em.find(Result.class, id);
    }

    @Transactional
    public void deleteResultById(Long id) {
        Result result = em.find(Result.class, id);

        if (result != null) {
            em.remove(result);
        }
    }
}

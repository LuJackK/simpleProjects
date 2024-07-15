using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
public float velocity = 1;
public Rigidbody2D rb;
public Animator animator;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            animator.SetBool("Space",true);
            StartCoroutine(Timer());
            rb.velocity = Vector2.up * velocity;

        }
        
    }
    IEnumerator Timer()
    {
    yield return new WaitForSeconds(velocity);
    animator.SetBool("Space",false); 
    }
}


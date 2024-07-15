using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObstacleMovement : MonoBehaviour

{
    public float velocity = 1;
    public Rigidbody2D rb;
    public float lifeTime=10000;
    // Start is called before the first frame update
    void Start()
    {
     
       rb = GetComponent<Rigidbody2D>();
    
    }

    // Update is called once per frame
    void Update()
    {
        rb.velocity = new Vector2  (-velocity,0f);
        
    }
}

import org.junit.Test;
import static org.junit.Assert.assertEquals;


public class HelloWorldTest{
    @Test 
    public void testAdd(){
        assertEquals(HelloWorld.sum(1, 2), 3);
    }
}
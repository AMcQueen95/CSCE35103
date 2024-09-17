import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UDPServer
{
    public static void main(String a[]) throws Exception
    {
        DatagramSocket ds = new DatagramSocket();

        byte[] b1 = new byte[1024]; 
        DatagramPacket dp = new DatagramPacket(b1, b1.length);
        ds.receive(dp);
        String str = new String(dp.getData());
        int num = Integer.parseInt(str);
    }
}
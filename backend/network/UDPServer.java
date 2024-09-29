import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.nio.ByteBuffer;

public class UDPServer
{
    public void receiveDatagram() 
    {
        
    }

    public void sendDatagram(int code) 
    {
        DatagramSocket ds = new DatagramSocket(7500); //Use 7500 to send datagram
        byte[] send = convertIntToByteArray(code); //Converts the code to a byte[] to add to datagram

        DatagramPacket DpSend = new DatagramPacket(send, send.length); //Creates datagram with code to send through socket

        ds.send(DpSend); 

        ds.close(); //Close bc memory leaks
    }

    //Decode the byte
	public static int convertByteArrayToInt(byte[] bytes) { //Just look at the name
        return ByteBuffer.wrap(bytes).getInt();
    }

    //Enconde the byte
    public static byte[] convertIntToByteArray(int code) //Just look at the name
    {
        return ByteBuffer.allocate(4).putInt(code).array();
    }
}
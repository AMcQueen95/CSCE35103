package com.example.backend.udp;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import com.example.backend.controller.WebController;
import java.nio.charset.StandardCharsets;

@Component
public class UDPService {

    private DatagramSocket receiveSocket;
    private DatagramSocket sendSocket;
    private int bufferSize = 1024;
    private int recievePort = 7501;
    private int sendPort = 7501;
    private InetAddress address;

    public UDPService() {
    }

    public void start() {
        try {
            this.address = InetAddress.getByName("localhost");
            this.receiveSocket = new DatagramSocket(); // Listening on port 7501
            this.sendSocket = new DatagramSocket();
            // Start receiving packets in a new thread
            new Thread(this::receiveDatagram).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void Init() {
        start();
    }

    // Send a datagram with the Code to a specific host and port
    public void sendDatagram(String code) {
        if (this.sendSocket == null) {
            System.err.println("Socket is not initialized. Cannot send datagram.");
            return;
        }
        
        try {
            byte[] sendBuffer = code.getBytes(StandardCharsets.UTF_8); //Turns the code into string

            DatagramPacket packet = new DatagramPacket(sendBuffer, sendBuffer.length, this.address, this.sendPort); //Creates packet w/information
            this.sendSocket.send(packet); // Send the datagram

            System.out.println("UDP packet sent with Code: " + code + " over \"localhost\" and port: " + this.sendPort);

        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
    }

    // Receive datagrams from the socket
    private void receiveDatagram() {
        if (this.receiveSocket == null) {
            System.err.println("Socket is not initialized. Cannot send datagram.");
            return;
        }

        try {
            byte[] receiveBuffer = new byte[this.bufferSize]; // Buffer to hold incoming datagrams

            while (true) {
                DatagramPacket packet = new DatagramPacket(receiveBuffer, this.bufferSize, this.address, this.recievePort);
                this.receiveSocket.receive(packet); // Receive the packet

                String received = new String(packet.getData(), "UTF-8");
                /*
                 * 
                 *  WebController.functionName(recieved)
                 * 
                 */
                System.out.println("Received String: \"" + received + "\""); // Handle the received ID
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
